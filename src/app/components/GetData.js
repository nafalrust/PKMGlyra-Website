import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/lib/firebase';

export function useFirebaseReadings(code) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!code) return;

    const fetchData = async () => {
      setLoading(true);
      setErrorMsg('');
      setData(null);

      try {
        const devicePath = `readings/${code.trim()}/samples`;
        const snap = await get(ref(database, devicePath));

        if (!snap.exists()) {
          setErrorMsg(`Data untuk kode "${code}" tidak ditemukan.`);
          setLoading(false);
          return;
        }

        const samplesRoot = snap.val();
        const sensors = {
          mics5524: [],
          mq135: [],
          mq138: [],
          pressure: [],
          temperature: [],
          tgs2602: [],
          tgs822: [],
        };

        Object.values(samplesRoot).forEach((batch) => {
          Object.values(batch).forEach((sample) => {
            for (const key in sensors) {
              if (sample[key] !== undefined) sensors[key].push(sample[key]);
            }
          });
        });

        setData(sensors);
      } catch (err) {
        setErrorMsg('Terjadi error saat mengambil data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code]);

  return { data, loading, errorMsg };
}

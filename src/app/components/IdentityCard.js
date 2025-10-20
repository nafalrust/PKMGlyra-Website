'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateUserProfile } from '@/lib/auth';

export default function IdentityCard(props) {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [nickname, setNickname] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const currentUser = getCurrentUser();
        if (!currentUser) {
            router.push('/login');
        } else {
            setUser(currentUser);
            // Pre-fill name if available
            if (currentUser.displayName) {
                setFullName(currentUser.displayName);
            }
        }
    }, [router]);

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const getDaysInMonth = (month, year) => {
        if (!month || !year) return 31;
        const monthNum = parseInt(month);
        if (monthNum === 2) {
            return isLeapYear(parseInt(year)) ? 29 : 28;
        }
        if ([4, 6, 9, 11].includes(monthNum)) {
            return 30;
        }
        return 31;
    };
    const handleDayChange = (e) => {
        const value = e.target.value;
        if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= getDaysInMonth(month, year))) {
            setDay(value);
        }
    };

    const handleMonthChange = (e) => {
        const value = e.target.value;
        if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
            setMonth(value);

            if (day && parseInt(day) > getDaysInMonth(value, year)) {
                setDay(getDaysInMonth(value, year).toString());
            }
        }
    };

    const handleYearChange = (e) => {
        const value = e.target.value;
        const currentYear = new Date().getFullYear();
        
        if (value === '') {
            setYear(value);
            return;
        }
        
        const numValue = parseInt(value);
        if (value.length < 4) {
            setYear(value);
        } else if (numValue >= 1900 && numValue <= currentYear) {
            setYear(value);
            if (day && month && parseInt(day) > getDaysInMonth(month, value)) {
                setDay(getDaysInMonth(month, value).toString());
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!fullName || !nickname || !day || !month || !year || !height || !weight) {
            setError('Please fill in all fields');
            return;
        }

        if (!user) {
            setError('User not authenticated');
            return;
        }

        setLoading(true);

        // Format date of birth
        const dateOfBirth = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;

        const result = await updateUserProfile(user.uid, {
            fullName,
            nickname,
            dateOfBirth,
            height: parseFloat(height),
            weight: parseFloat(weight),
        });

        if (result.success) {
            // Redirect to dashboard or home
            alert('Profile updated successfully!');
            router.push('/');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="w-full max-w-sm sm:max-w-md md:w-96 bg-white rounded-2xl shadow-lg p-6 sm:p-8 mx-4 flex flex-col justify-center items-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Complete Your Identity</h1>

            {error && (
                <div className="w-full mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="w-full">
                <input
                    type="text"
                    name="fullName"
                    aria-label="Full Name"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full mb-3 p-2 bg-gray-100 border-none rounded-lg text-sm"
                />

                <input
                    type="text"
                    name="nickname"
                    aria-label="Nickname"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                    className="w-full mb-3 p-2 bg-gray-100 border-none rounded-lg text-sm"
                />

                <div className="w-full mb-3">
                    <label className="block text-xs text-gray-600 mb-1">Date of Birth</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="day"
                            value={day}
                            onChange={handleDayChange}
                            aria-label="Day"
                            placeholder="DD"
                            min="1"
                            max={getDaysInMonth(month, year)}
                            required
                            className="w-1/3 p-2 bg-gray-100 border-none rounded-lg text-sm text-center"
                        />
                        <input
                            type="number"
                            name="month"
                            value={month}
                            onChange={handleMonthChange}
                            aria-label="Month"
                            placeholder="MM"
                            min="1"
                            max="12"
                            required
                            className="w-1/3 p-2 bg-gray-100 border-none rounded-lg text-sm text-center"
                        />
                        <input
                            type="number"
                            name="year"
                            value={year}
                            onChange={handleYearChange}
                            aria-label="Year"
                            placeholder="YYYY"
                            min="1900"
                            max={new Date().getFullYear()}
                            required
                            className="w-1/3 p-2 bg-gray-100 border-none rounded-lg text-sm text-center"
                        />
                    </div>
                </div>

                <input
                    type="number"
                    name="heightCm"
                    aria-label="Height (cm)"
                    placeholder="Height (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    min="0"
                    step="0.1"
                    required
                    className="w-full mb-3 p-2 bg-gray-100 border-none rounded-lg text-sm"
                />

                <input
                    type="number"
                    name="weightKg"
                    aria-label="Weight (kg)"
                    placeholder="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="0"
                    step="0.1"
                    required
                    className="w-full mb-4 p-2 bg-gray-100 border-none rounded-lg text-sm"
                />

                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-2 rounded-lg font-semibold mb-0 hover:bg-gray-800 transition duration-300 disabled:bg-gray-400"
                >
                    {loading ? 'Saving...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}
       
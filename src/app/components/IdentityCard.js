'use client';
import { useState } from 'react';

export default function IdentityCard(props) {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

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
        if (value === '' || (parseInt(value) >= 1900 && parseInt(value) <= currentYear)) {
            setYear(value);
            if (day && month && parseInt(day) > getDaysInMonth(month, value)) {
                setDay(getDaysInMonth(month, value).toString());
            }
        }
    };

    return (
        <div className="w-full max-w-sm sm:max-w-md md:w-96 bg-white rounded-2xl shadow-lg p-6 sm:p-8 mx-4 flex flex-col justify-center items-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Complete Your Identity</h1>

            <input
                type="text"
                name="fullName"
                aria-label="Full Name"
                placeholder="Full Name"
                className="w-full mb-3 p-2 bg-gray-100 border-none rounded-lg text-sm"
            />

            <input
                type="text"
                name="nickname"
                aria-label="Nickname"
                placeholder="Nickname"
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
                        className="w-1/3 p-2 bg-gray-100 border-none rounded-lg text-sm text-center"
                    />
                </div>
            </div>

            <input
                type="number"
                name="heightCm"
                aria-label="Height (cm)"
                placeholder="Height (cm)"
                min="0"
                step="0.1"
                className="w-full mb-3 p-2 bg-gray-100 border-none rounded-lg text-sm"
            />

            <input
                type="number"
                name="weightKg"
                aria-label="Weight (kg)"
                placeholder="Weight (kg)"
                min="0"
                step="0.1"
                className="w-full mb-4 p-2 bg-gray-100 border-none rounded-lg text-sm"
            />

            <button className="w-full bg-black text-white py-2 rounded-lg font-semibold mb-0 hover:bg-gray-800 transition duration-300">Submit</button>
        </div>
    );
}
       
import React, { useState } from 'react'
import YearCard from '../src/YearCalendar/YearCard'
import MonthCard from '../src/MonthCalendar/MonthCard';

export default function index() {
    const interval = { begin: 1950, end: 2050 };
    const date = new Date();

    const [datepickerType, setDateickerType] = useState(true);
    const [selectedDate, setSelectedDate] = useState({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: [],
    });

    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    function getMonthList(year) {
        const months = [
            { name: "Janeiro", days: getDaysInMonth(year, 1) },
            { name: "Fevereiro", days: getDaysInMonth(year, 2) },
            { name: "Março", days: getDaysInMonth(year, 3) },
            { name: "Abril", days: getDaysInMonth(year, 4) },
            { name: "Maio", days: getDaysInMonth(year, 5) },
            { name: "Junho", days: getDaysInMonth(year, 6) },
            { name: "Julho", days: getDaysInMonth(year, 7) },
            { name: "Agosto", days: getDaysInMonth(year, 8) },
            { name: "Setembro", days: getDaysInMonth(year, 9) },
            { name: "Outubro", days: getDaysInMonth(year, 10) },
            { name: "Novembro", days: getDaysInMonth(year, 11) },
            { name: "Dezembro", days: getDaysInMonth(year, 12) },
        ];
        return months;
    }

    function getYearList(startYear, endYear) {
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
            const months = getMonthList(year);
            years.push({ year, months });
        }
        return years;
    }

    const calendar = getYearList(interval.begin, interval.end);

    const changePicker = () => {
        setDateickerType((prev) => !prev);
    };

    const changeDate = (obj) => {
        setSelectedDate((prev) => ({ ...prev, ...obj }));
    };

    const minimumYearVerification = (month = null) => {
        if (
            (month === 11 && selectedDate.year - 1 < interval.begin) ||
            (month !== null && selectedDate.year - 1 < interval.begin)
        ) {
            alert("Já está no ano mínimo");
            return;
        }

        if (month === 11) {
            changeDate({ month, year: selectedDate.year - 1 });
            return;
        } else if (month !== null) {
            changeDate({ month });
            return;
        }

        changeDate({ year: selectedDate.year - 1 });
    };

    const maximumYearVerification = (month = null) => {
        if (month === 12 && selectedDate.year + 1 > interval.end) {
            alert("Já está no ano máximo");
            return;
        }
        if (month === 12) {
            changeDate({ month: 0, year: selectedDate.year + 1 });
            return;
        } else if (month !== null) {
            changeDate({ month });
            return;
        }

        changeDate({ year: selectedDate.year - 1 });
    };

    const actualYearList = calendar.find(
        (elem) => elem.year === selectedDate.year
    );

    return (
        <>
            {datepickerType ?
                (
                    <YearCard
                        changePicker={changePicker}
                        calendar={calendar}
                        selectedDate={selectedDate}
                        interval={interval}
                        changeDate={changeDate}
                    />
                ) : (
                    <MonthCard
                        changePicker={changePicker}
                        calendar={calendar}
                        selectedDate={selectedDate}
                        minimumYearVerification={minimumYearVerification}
                        maximumYearVerification={maximumYearVerification}
                        changeDate={changeDate} 
                    />
                )
            }
            {/* <div className="">
                <div className="">
                    Intervalo:{" "}
                    <span>
                        {selectedDate.day.length > 1
                            ? `${selectedDate.day[0]?.day} - ${selectedDate.day[selectedDate.day.length - 1]?.day
                            }`
                            : !selectedDate?.day?.length === 1
                                ? `${selectedDate.day[0]?.day}`
                                : "Nenhum"}
                    </span>
                </div>
                <div className="">
                    Mês: <span>{actualYearList.months[selectedDate.month].name}</span>
                </div>
                <div className="">
                    Ano: <span>{selectedDate.year}</span>
                </div>
            </div> */}
        </>
    )
}

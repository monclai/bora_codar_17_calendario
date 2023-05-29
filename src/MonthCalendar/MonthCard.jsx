import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import React, { useId, useState } from 'react'
import styled from 'styled-components';

const MonthSection = styled.section`

    padding: 3.2rem;
    background-color: #fff;
    box-shadow: .0rem .8rem 3.2rem rgba(0, 0, 0, 0.16);
    border-radius: 1.6rem;

    width: fit-content;

    display: grid;
    grid-template-rows: 4rem 1fr;
    gap: 2.4rem;

    header{
        display: flex;
        align-items: center;
        justify-content: space-between;

        font-weight: 700;
        color: #333;
    }

    header i{
        padding: 1.6rem;
        border-radius: 50%;
        color: #666;
    }

    header i:hover{
        background-color: #ECE0FD;
    }

    main{
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: .8rem;
        
    }

    main > div.days{
        width: 4rem;
        height: 3.2rem;
        cursor: default;

        display: flex;
        justify-content: center;
        align-items: center;

        font-weight: 400;
        font-size: 1.2rem;
        line-height: 1.6rem;
        color: #666;
        text-align: center;
        letter-spacing: 0.08em;
    }

    main > div:not(.days) {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.2rem;
        gap: .8rem;
        isolation: isolate;

        width: 4.0rem;
        height: 4.0rem;
        border-radius: .8rem;

        color: #666;

        font-size: 1.6rem;
        line-height: 1.6rem;  
    }

    main > div.disabled{

        opacity: 0.5;

    }
    

`

export default function MonthCard({ changePicker, calendar, selectedDate, minimumYearVerification, maximumYearVerification, changeDate }) {

    const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    function getFirstDayOfWeek(month, year) {
        const date = new Date(Date.UTC(year, month, 1));
        return date.getUTCDay();
    };

    const actualYearList = calendar.find(
        (elem) => elem.year === selectedDate.year
    );
    const beforeActualYearList = calendar.find(
        (elem) => elem.year - 1 === selectedDate.year - 1
    );

    const month = actualYearList.months[selectedDate.month].name;
    const year = actualYearList.year;

    const firstDay = getFirstDayOfWeek(selectedDate.month, selectedDate.year);

    const getFirstRow = () => {
        const row = [];

        const lastMonthSize = firstDay;
        const actualMonthFirstRowSize = 7 - firstDay;

        let lastMonthDays =
            beforeActualYearList.months[
                selectedDate.month === 0 ? 11 : selectedDate.month - 1
            ].days - firstDay;
        //last month
        for (let i = 0; i < lastMonthSize; i++) {
            lastMonthDays++;
            row.push({ type: "last", day: lastMonthDays });
        }

        //first row actual month
        for (let i = 0; i < actualMonthFirstRowSize; i++) {
            row.push({ type: "actual", day: i + 1 });
        }

        return row;
    };// end function

    const getDaysMatrixAfterFirstRow = () => {
        let rows,
            columns = 7;
        const daysOfMonthOfActualYear =
            actualYearList.months[selectedDate.month].days;
        const startOfSecondLine = 7 - firstDay + 1;

        const daysFromSecondLine = daysOfMonthOfActualYear - (7 - firstDay);

        rows = Math.ceil(daysFromSecondLine / 7);
        let count = startOfSecondLine;
        let type = "actual";

        const daysMatrixRows = [getFirstRow()];

        let daysMatrixColumns = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                daysMatrixColumns.push({ type, day: count });
                if (count >= daysOfMonthOfActualYear) {
                    count = 0;
                    type = "next";
                }
                count++;
            }
            daysMatrixRows.push(daysMatrixColumns);
            daysMatrixColumns = [];
        }

        return daysMatrixRows;
    };

    const matrixDays = getDaysMatrixAfterFirstRow();


    return (
        <MonthSection>
            <header>
                <i>
                    <CaretLeft size={24} onClick={() => {
                        const month = selectedDate.month - 1;
                        if (month === -1) minimumYearVerification(11);
                        else minimumYearVerification(selectedDate.month - 1);
                    }} />
                </i>
                <span onClick={changePicker}>{month} {year}</span>
                <i>
                    <CaretRight size={24} onClick={() => {
                        const month = selectedDate.month + 1;
                        if (month === 12) maximumYearVerification(12);
                        else maximumYearVerification(selectedDate.month + 1);
                    }} />
                </i>
            </header>
            <main>
                {weekDays.map((day) => {
                    return (<div className='days' key={useId()}>{day}</div>)
                })}

                {
                    matrixDays.map((weekOfMonth) => {
                        return weekOfMonth.map((daysOfWeek) => {
                            return (<div className={(daysOfWeek.type == "last" || daysOfWeek.type ==  "next") ? "disabled" : undefined} key={useId()}>{daysOfWeek.day}</div>)
                        })
                    })
                }
            </main>

        </MonthSection>
    )
}

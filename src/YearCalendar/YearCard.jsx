import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import React, { useId, useState } from 'react'
import styled from 'styled-components'

const YearSection = styled.section`
    padding: 3.2rem;
    background-color: #fff;
    box-shadow: .0rem .8rem 3.2rem rgba(0 0 0 / .16);
    border-radius: 1.6rem;

    width: fit-content;

    display: grid;
    grid-template-rows:  4rem 1fr;
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
        grid-template-columns: repeat(3, 1fr);
        gap: 1.6rem;
    }

    main > div{
        width: 8.2rem;
        height: 4.0rem;

        display: flex;
        align-items: center;
        justify-content: center;

        color: #666;
        cursor: pointer;
        transition: all .3s;
        border-radius: .8rem;
    }

    main > div:hover{
        background-color: #ECE0FD;
        border-radius: .8rem;
    }

    main > div.active{
        background: #6200EE;
        color: #fff;
        border-radius: .8rem;
        font-weight: 700;
        position: relative;
        transition: all .3s;
    }

    main > div.active::after{
        content: "";
        width: .4rem;
        height: .4rem;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        bottom: .6rem;
    }   
`

export default function YearCard({ changePicker, calendar, selectedDate, changeDate, interval }) {

    const actualYearList = calendar.find(
        (elem) => elem.year === selectedDate.year
    );

    const shortMonths = actualYearList.months.map(
        // (elem) => `${elem.name[0]}${elem.name[1]}${elem.name[2]}`
        // (elem) =>` ${elem.name.slice(0, 3)}`
        (elem) => elem.name.slice(0, 3)
    );

    const previousYear = () => {
        if (selectedDate.year <= interval.begin) alert("Já está no mínimo");
        else changeDate({ year: selectedDate.year - 1 });
    };

    const nextYear = () => {
        if (selectedDate.year >= interval.end) alert("Já está no máximo");
        else changeDate({ year: selectedDate.year + 1 });
    };


    //saidas
    // vendo saidas var locais
    // console.log(actualYearList)
    // console.log(shortMonths)

    // //vendo saidas var externas
    // console.log(changePicker);
    // console.log(calendar)
    // console.log(selectedDate)
    // console.log(changeDate)
    // console.log(interval)
    // 

    return (
        <YearSection>
            <header>
                <i>
                    <CaretLeft size={24} onClick={previousYear} />
                </i>
                <span onClick={changePicker}>{actualYearList.year}</span>
                <i>
                    <CaretRight size={24} onClick={nextYear} />
                </i>
            </header>
            <main>
                {shortMonths.map((month, index) => {
                    return (<div className={selectedDate.month == index ? 'active' : ''} onClick={() => changeDate({ month: index })} key={useId()}>{month}</div>)
                })}
            </main>

        </YearSection>
    )
}

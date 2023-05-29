import styled from "styled-components";
import { useState } from "react";

export default function SeatItem(props) {
  const available = props.isAvailable;
    const [selected, setSelected] = useState(false);
    
    function Select() {
        if (!selected) {
          setSelected(true);
          if (!props.selectedSeats.includes(props.seatId)) {
            props.setSelectedSeats([...props.selectedSeats, props.seatId]);
          }
          if (!props.selectedSeatsName.includes(props.name)) {
            props.setSelectedSeatsName([...props.selectedSeatsName, props.name]);
          }
        }
        if (selected) {
          setSelected(false);
          if (props.selectedSeats.includes(props.seatId)) {
            props.setSelectedSeats(props.selectedSeats.filter(i => i !== props.seatId));
          }
          if (props.selectedSeatsName.includes(props.name)) {
            props.setSelectedSeatsName(props.selectedSeatsName.filter(i => i !== props.name));
          }
        }
      }      

    return (
        <Seat data-test="seat" isAvailable={props.isAvailable} selected={selected} onClick={() => Select()} disabled={!available}>{props.name}</Seat>
    );
}

const Seat = styled.div`
    border: ${props => props.isAvailable ? props.selected? '1px solid #0E7D71': '1px solid #7B8B99' : '1px solid #F7C52B'};
    background-color: ${props => props.isAvailable ? props.selected? '#1AAE9E' : '#C3CFD9' : '#FBE192'};  
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
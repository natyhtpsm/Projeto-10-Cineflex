import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import SeatItem from "../../components/SeatItem";

export default function SeatsPage() {

    const [seats, setSeats] = useState();
    const [weekday, setWeekday] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [poster, setPoster] = useState();
    const [title, setTitle] = useState();
    const [selectedSeats, setSelectedSeats] = useState([]);

    const parameters = useParams();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parameters.idSessao}/seats`;
        const promise = axios.get(url);

        promise.then(obj => {
            setSeats(obj.data.seats);
            setWeekday(obj.data.day.weekday);
            setDate(obj.data.day.date);
            setHour(obj.data.name);
            setPoster(obj.data.movie.posterURL);
            setTitle(obj.data.movie.title);
            console.log('INFORMACOES: ', obj);
            console.log('ASSENTOS: ', seats);
            console.log('SEMANA: ', weekday);
            console.log('DIA: ', date);
            console.log('HORA: ', hour);
            console.log('POSTER: ', poster);
            console.log('TITULO: ', title);
    
        });
        promise.catch(erro => console.log(erro.response.data));

    }, []);

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats?.map(seat => (
                    <StyledLink>
                        <SeatItem isAvailable={seat.isAvailable} name={seat.name} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}></SeatItem>
                    </StyledLink>
                ))}  
            </SeatsContainer>
            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle style={{backgroundColor: '#1AAE9E', border: '1px solid #0E7D71'}} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle style={{backgroundColor: '#C3CFD9', border: '1px solid #7B8B99'}}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle style={{backgroundColor: '#FBE192', border: '1px solid #F7C52B'}}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={poster} alt="poster" />
                </div>
                <div>
                    <p>{title}</p>
                    <p>{weekday} ({date}) - {hour}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`
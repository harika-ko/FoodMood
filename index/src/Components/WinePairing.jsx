import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Image, Alert } from 'react-bootstrap'
import winepic from '../Assets/wine.jpg';
import wine7 from '../Assets/wine7.jpg';
import wine3 from '../Assets/wine3.jpg';
import wine5 from '../Assets/wine5.jpg';
import WineGlass from '../Assets/wine-glass.png';
import "../css/WinePairing.css";
import swal from 'sweetalert';

const WinePairing = () => {

    const [wine, setWine] = useState([])
    const [food, setFood] = useState([])
    const [text, setText] = useState("")
    const [hasfood, setHasFood] = useState(false)
    const [input, setInput] = useState(false)

    function handleChange(e) {
        setFood(e.target.value)
    }

    useEffect(() => {
        fetchWine();
    }, []);

    const handleClick = () => {
        if (food.length === 0) {
            swal({
                title: "OOPS!",
                text: "Input Food cannot be blank...",
                icon: "error",
                dangerMode: true,
            });
            setHasFood(false);
        }
    }

    const handleFood = () => {
        swal({
            title: "OOPS!",
            text: "Please enter a valid Food name",
            icon: "error",
            dangerMode: true,
        });
        setHasFood(false);
    }

    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };


    const fetchWine = async () => {
        let response = await fetch(
            `https://api.spoonacular.com/food/wine/pairing?food=${food}&apiKey=7d037e2e5e7c41b28f796eb9af1c7522`,
            options
        );
        let responseData = await response.json();
        console.log("This is Wine pairing get console", responseData);
        setWine(responseData.pairedWines)
        setText(responseData.pairingText)

        if (responseData.message.includes("Could not find a wine pairing for")) {
            handleFood();
        }
    }

    return (
        <>


            <div class="first-cont">
                <div className="second_container">
                    <Container className="wine-cont">
                        <Row>
                            <Col className="wp-col">
                                <div style={{ display: "flex" }}>
                                    <div xs={6} className="wp-text-div">
                                        <h1 style={{ color: "#34B267" }}>Wine Pairing</h1>
                                        <h4 className="sub-head">Find a wine that goes well with a food.<br></br>
                                            Food can be a Dish name, an Ingredient name, or a Cuisine!
                                        </h4>
                                        <div>
                                            <Form style={{ marginTop: "2rem" }}>
                                                <div className="form-div">
                                                    <Form.Label style={{ fontWeight: "bold", fontSize: "1.3rem", marginRight: "1rem" }}>Enter the Food</Form.Label>

                                                </div>
                                                <div style={{ display: "flex" }}>
                                                    <Form.Control type="text" placeholder="Enter the food here" onChange={handleChange} className="input-text"
                                                        style={{ width: "13rem" }} />
                                                    <Button className="suggestions-button" variant="success" onClick={() => { fetchWine(); setHasFood(true); handleClick(); }}>Get Suggestions</Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                    <div xs={6}>
                                        <Image src={winepic} className="winepic" />
                                    </div>
                                </div>

                                <Container className="result-main">
                                    <Row>
                                        {hasfood ? (
                                            <Col className="result-container">
                                                <h4 className="wine-head">Wine Suggestions for {food}</h4>
                                                <div>
                                                    <div className="wine-text-list">
                                                        {wine && wine.map((wine) => (
                                                            <div style={{ display: "flex", gap: "0.3rem" }}>
                                                                <img src={WineGlass} alt="wine glass" style={{ height: "1.3rem", width: "1.3rem" }} className="wine-glass-icon" />
                                                                <p className="list">{wine}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="wine-images" style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                        <img src={wine3} alt="wine pic" className="wine1" />
                                                        <img src={wine7} alt="wine pic" className="wine1" />
                                                        <img src={wine5} alt="wine pic" className="wine1" />
                                                    </div>
                                                </div>

                                                <h4 className="head-des"> Description </h4>
                                                <p className="para-des">{text}</p>
                                            </Col>) : ("")
                                        }
                                    </Row>
                                </Container>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

        </>
    )
}

export default WinePairing
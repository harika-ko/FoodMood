import { Container, Row, Col, Image } from "react-bootstrap";
import { HeartFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeFavourite } from "../redux/actions";
import "../css/Favorites.css";

const FavouritesPage = () => {

    const favourites = useSelector((state) => state.favourites);

    const dispatch = useDispatch();
    return (
        <div className="main-favorites" style={{ backgroundColor: "#D8F0E6" }}>
            <div style={{ paddingLeft: "1.3rem", paddingRight: "1rem", minHeight: "100vh", paddingBottom: "2rem" }}>
                <Container style={{ backgroundColor: "white", borderRadius: "1rem", paddingTop: "1rem" }}>
                    <h1 style={{ textAlign: "center", color: "#35B066", marginBottom: "2rem" }}>My Favourite Recipes</h1>
                    <Row>
                        {favourites &&
                            favourites.map((singlerecipe, i) => (
                                <>
                                    <Col md={6} key={i}>
                                        <div style={{
                                            backgroundColor: "whitesmoke", display: "flex", justifyContent: "space-around",
                                            padding: "1rem", borderRadius: "1rem", marginBottom: "2rem", gap: "21px"
                                        }}>
                                            <div>
                                                <h4 className="fav-recipe-title">{singlerecipe.title}</h4>
                                                <p className="health-score">Health Score: {singlerecipe.healthScore}</p>
                                                <h6 className="ready-serve">Ready In {singlerecipe.readyInMinutes} mins</h6>
                                                <h6 className="ready-serve">For {singlerecipe.servings} people</h6>
                                            </div>

                                            <div>
                                                <Image src={singlerecipe.image} alt="image" style={{
                                                    borderRadius: "50%",
                                                    height: "8rem", width: "8rem", display: "block", marginTop: "1rem", objectFit: "cover"
                                                }}></Image>
                                            </div>
                                            <HeartFill
                                                color="red"
                                                onClick={() => dispatch(removeFavourite(singlerecipe))}
                                                style={{ height: "25px", width: "20px", top: "1rem", position: "absolute", right: "2rem" }}
                                            />
                                        </div>

                                    </Col>
                                </>
                            ))
                        }
                    </Row>
                </Container>
            </div>
        </div >
    );
};

export default FavouritesPage
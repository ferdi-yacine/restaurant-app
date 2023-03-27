import "./footer.css";
import motto from "../../public/img/bg.png";

export const Footer = () => {
  return (
    <div className="footerContainer" id="footer">
      <div className="footerItem">
        <img
          className="footerImg"
          src={motto}
          objectFit="cover"
          layout="fill"
          alt=""
        />
      </div>
      <div className="footerItem">
        <div className="footerCard">
          <h2 className="footerMotto">
            OH YES, WE DID.THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.
          </h2>
        </div>
        <div className="footerCard">
          <h1 className="footerTitle">FIND OUR RESTAURANTS</h1>
          <p className="footerText">
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className="footerText">
            2356 K. Laquie Rd #235.
            <br /> NewYork, 85022
            <br /> (602) 867-1011
          </p>
        </div>
        <div className="footerCard">
          <h1 className="footerTitle">WORKING HOURS</h1>
          <p className="footerText">
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className="footerText">
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import styles from "./HotelCard.module.css";

const HotelCard = ({ hotel }) => {
  const { HotelName, HotelDescriptiveContent, HotelInfo, PricesInfo } = hotel;

  const image = HotelDescriptiveContent?.Images[0]?.URL;
  const priceAfterTax = PricesInfo?.AmountAfterTax;
  const rate = HotelInfo?.Rating;
  const beds = HotelInfo?.Beds;
  const name = HotelName;
  const location = `${HotelInfo?.Position?.Distances[0]?.distance} from ski lift, ${HotelInfo?.Position?.Distances[1]?.distance} from city center`;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.name}>{name}</div>
        <div className={styles.location}>{location}</div>
        <div className={styles.location}>Beds: {beds}</div>
        <div className={styles.rate}>
          {rate} <i className="material-icons">star_rate</i>
        </div>
        <div className={styles.price}>
          From <span className={styles.amount}>{priceAfterTax}</span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

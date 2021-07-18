import styles from "./OneAlbumItem.module.css";

const OneAlbumImage = (props) => {
  return (
    <div className={styles.card}>
      <div className="">
        <div className={styles.image}>
          <img className="" src={props.url} alt="Album" />
        </div>
        <p className={styles.title}>{props.title}</p>
      </div>
    </div>
  );
};

export default OneAlbumImage;

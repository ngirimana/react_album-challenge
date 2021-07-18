import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Spinner from "../Spinner/Spinner";
import { getAllAlbumImages } from "../actions/albumAction";
import OneAlbumImage from "../album/OneAlbumImage/OneAlbumItem";
import styles from "./AllAlbumImages.module.css";

const ImagesList = () => {
  const [albumId, setAlbumId] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();
  const { loading, images } = useSelector((state) => state.images);
  const imagesPerPage = 9;
  const pagesVisited = pageNumber * imagesPerPage;
  const pageCount = images.length
    ? Math.ceil(images.length / imagesPerPage)
    : 0;
  const changePageHandler = ({ selected }) => {
    setPageNumber(selected);
  };

  const paginatedImage = images
    .slice(pagesVisited, pagesVisited + imagesPerPage)
    .map((album) => {
      return (
        <OneAlbumImage
          key={album.id}
          title={album.title}
          url={album.thumbnailUrl}
        />
      );
    });

  const submitHandler = (e) => {
    console.log(isNotFound);
    e.preventDefault();
    if (albumId.trim().length === 0 || albumId === "") {
      setIsNotFound(true);
      return;
    }
    if (!Number.isInteger(+albumId) || +albumId < 0 || +albumId > 100) {
      setIsNotFound(true);

      return;
    }
    dispatch(getAllAlbumImages(albumId));
    setAlbumId("");
    setIsNotFound(false);
  };

  return (
    <Fragment>
      <div className={styles.searchForm}>
        <input
          className={styles.searchInput}
          value={albumId}
          placeholder="Type Album Id"
          onChange={(e) => setAlbumId(e.target.value)}
          onFocus={(e) => setIsNotFound(false)}
        />
        <button className={styles.searchButton} onClick={submitHandler}>
          Search
        </button>
      </div>
      <div>
        <div className={styles.container}>
          {isNotFound ? (
            <Fragment>
              <div className={styles.notFound}>
                <p className={styles.notFoundText}>
                  {albumId
                    ? `We haven't album with this ID :${albumId}`
                    : "Enter album ID"}
                  <br />
                  Album Id must be between 1 and 100, both included.
                </p>
              </div>
            </Fragment>
          ) : loading ? (
            <Spinner />
          ) : (
            paginatedImage
          )}
        </div>
      </div>
      {!loading && !isNotFound && images.length > 9 ? (
        <div className={styles.paginationContainer}>
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePageHandler}
            containerClassName={styles.paginationBtn}
            activeClassName={styles.paginationActive}
          />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ImagesList;

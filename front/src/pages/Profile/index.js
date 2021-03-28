import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import './styles.scss';

const Profile = () => {
  return (
    <>
      <Header />
      <section className="profile-container">
        <article className="info">
          <div className="photo">
            <div className="img">
              <img
                src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile7.uf.tistory.com%2Fimage%2F24283C3858F778CA2EFABE"
                alt="profile"
              />
            </div>

            <button>
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.9998 13.2C11.7671 13.2 13.1998 11.7673 13.1998 9.99999C13.1998 8.23268 11.7671 6.79999 9.9998 6.79999C8.23249 6.79999 6.7998 8.23268 6.7998 9.99999C6.7998 11.7673 8.23249 13.2 9.9998 13.2Z"
                  fill="white"
                />
                <path
                  d="M7 0L5.17 2H2C0.9 2 0 2.9 0 4V16C0 17.1 0.9 18 2 18H18C19.1 18 20 17.1 20 16V4C20 2.9 19.1 2 18 2H14.83L13 0H7ZM10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div className="desc">
            <div>
              <strong>김지은</strong>
              <span>2003.08.20</span>
            </div>
            <p>공부인증 10회</p>
            <p>Follower 11 / Following 5</p>
            <p>안녕하세요 맞팔해요!</p>
          </div>
          <button>
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 8C16.21 8 18 6.21 18 4C18 1.79 16.21 0 14 0C11.79 0 10 1.79 10 4C10 6.21 11.79 8 14 8ZM5 6V3H3V6H0V8H3V11H5V8H8V6H5ZM14 10C11.33 10 6 11.34 6 14V16H22V14C22 11.34 16.67 10 14 10Z"
                fill="white"
              />
            </svg>
            팔로우
          </button>
        </article>
        <article className="feed">
          <div className="feed__content">
            <div
              className="feed__card"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/originals/72/28/f7/7228f7c0ae365b25d319ca0d9723c48e.jpg')"
              }}
            >
              <div>
                <div>
                  <p className="date">2021.03.14</p>
                  <p className="comment">
                    내일부터 시월 십칠내일부터 시월 십칠내일부터 시월 십칠내일부터 시월 십칠내일부터
                    시월 십칠
                  </p>
                  <p className="like">
                    <button>
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5002 19.2396L8.98975 17.8646C3.62516 13 0.0834961 9.79167 0.0834961 5.85417C0.0834961 2.64583 2.60433 0.125 5.81266 0.125C7.62516 0.125 9.36475 0.96875 10.5002 2.30208C11.6356 0.96875 13.3752 0.125 15.1877 0.125C18.396 0.125 20.9168 2.64583 20.9168 5.85417C20.9168 9.79167 17.3752 13 12.0106 17.875L10.5002 19.2396Z"
                          fill="#FF656E"
                        />
                      </svg>
                    </button>
                    like 30
                  </p>
                </div>
                <button>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 -1.39876e-06C7.16345 -2.17128e-06 2.17128e-06 7.16344 1.39876e-06 16C6.26248e-07 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 -6.26248e-07 16 -1.39876e-06ZM14.3111 24.8889L12.7378 23.3156L19.9644 16.0889L12.7378 8.86222L14.3111 7.28889L23.1111 16.0889L14.3111 24.8889Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              className="feed__card"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/originals/72/28/f7/7228f7c0ae365b25d319ca0d9723c48e.jpg')"
              }}
            >
              <div>
                <div>
                  <p className="date">2021.03.14</p>
                  <p className="comment">
                    내일부터 시월 십칠내일부터 시월 십칠내일부터 시월 십칠내일부터 시월 십칠내일부터
                    시월 십칠
                  </p>
                  <p className="like">
                    <button>
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5002 19.2396L8.98975 17.8646C3.62516 13 0.0834961 9.79167 0.0834961 5.85417C0.0834961 2.64583 2.60433 0.125 5.81266 0.125C7.62516 0.125 9.36475 0.96875 10.5002 2.30208C11.6356 0.96875 13.3752 0.125 15.1877 0.125C18.396 0.125 20.9168 2.64583 20.9168 5.85417C20.9168 9.79167 17.3752 13 12.0106 17.875L10.5002 19.2396Z"
                          fill="#FF656E"
                        />
                      </svg>
                    </button>
                    like 30
                  </p>
                </div>
                <button>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 -1.39876e-06C7.16345 -2.17128e-06 2.17128e-06 7.16344 1.39876e-06 16C6.26248e-07 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 -6.26248e-07 16 -1.39876e-06ZM14.3111 24.8889L12.7378 23.3156L19.9644 16.0889L12.7378 8.86222L14.3111 7.28889L23.1111 16.0889L14.3111 24.8889Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              className="feed__card"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/originals/72/28/f7/7228f7c0ae365b25d319ca0d9723c48e.jpg')"
              }}
            >
              <div>
                <div>
                  <p className="date">2021.03.14</p>
                  <p className="comment">
                    내일부터 시월 십칠내일부터 시월 십칠내일부터 시월 십칠내일부터 시월 십칠내일부터
                    시월 십칠
                  </p>
                  <p className="like">
                    <button>
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5002 19.2396L8.98975 17.8646C3.62516 13 0.0834961 9.79167 0.0834961 5.85417C0.0834961 2.64583 2.60433 0.125 5.81266 0.125C7.62516 0.125 9.36475 0.96875 10.5002 2.30208C11.6356 0.96875 13.3752 0.125 15.1877 0.125C18.396 0.125 20.9168 2.64583 20.9168 5.85417C20.9168 9.79167 17.3752 13 12.0106 17.875L10.5002 19.2396Z"
                          fill="#FF656E"
                        />
                      </svg>
                    </button>
                    like 30
                  </p>
                </div>
                <button>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 -1.39876e-06C7.16345 -2.17128e-06 2.17128e-06 7.16344 1.39876e-06 16C6.26248e-07 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 -6.26248e-07 16 -1.39876e-06ZM14.3111 24.8889L12.7378 23.3156L19.9644 16.0889L12.7378 8.86222L14.3111 7.28889L23.1111 16.0889L14.3111 24.8889Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>
      <BottomNav />
    </>
  );
};

export default Profile;

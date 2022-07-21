import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const mukzzibba = ["✌", "✊", "✋"];

const Home: NextPage = () => {
  const [gameImage, setGameImage] = useState(0);
  const [gameUserImage, setGameUserImage] = useState(0);
  const [gameDone, setGameDone] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [gameResult, setGameResult] = useState("");

  useEffect(() => {
    const gameStartTimer = setInterval(() => {
      const randomPrev = (prev: number) => {
        if (prev < mukzzibba.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      };

      setGameImage((prev) => {
        return randomPrev(prev);
      });

      setGameUserImage((prev) => {
        return randomPrev(prev);
      });
    }, 100);

    if (!gameDone) {
      gameStartTimer;
    } else {
      clearInterval(gameStartTimer);
    }

    return () => {
      clearInterval(gameStartTimer);
    };
  }, [gameDone]);

  const onClickUserResult = (userInput: number) => {
    if (!gameDone) {
      setGameDone(true);
      setResultModal(true);

      const randomResult = Math.floor(Math.random() * 3);

      if (userInput === randomResult) {
        setGameResult("무승부");
      } else if (
        userInput - randomResult === -2 ||
        userInput - randomResult === 1
      ) {
        setGameResult("승리!");
      } else if (
        userInput - randomResult === 2 ||
        userInput - randomResult === -1
      ) {
        setGameResult("패배...");
      } else {
        setGameResult("뭔가 잘못됐습니다.");
      }
      setGameImage(randomResult);
      setGameUserImage(userInput);
    }
  };

  const onClickReGame = () => {
    setGameDone(false);
    setGameImage(0);
    setGameUserImage(0);
    setGameResult("당신의 선택은?");
    setResultModal(false);
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col justify-between items-center w-screen h-screen">
        <div className="flex space-x-10 pt-20">
          <div className="text-4xl font-bold whitespace-nowrap">
            당신의 선택은?
          </div>
        </div>
        <div className="text-9xl">{mukzzibba[gameImage]}</div>
        <div className="w-full flex flex-col items-center text-4xl font-bold max-w-4xl space-y-4">
          <div>상대</div>
          <div className="w-[75%] h-1 bg-[#777777]"></div>
          <div>나</div>
        </div>
        <div className="text-9xl">{mukzzibba[gameUserImage]}</div>
        <div className="text-white font-bold text-xl flex justify-center w-screen items-center">
          <div className="flex w-full h-max justify-center bg-[#333333] max-w-4xl">
            <button
              className="w-1/3 border-r h-14"
              onClick={() => onClickUserResult(0)}
            >
              ✌
            </button>
            <button className="w-1/3 h-14" onClick={() => onClickUserResult(1)}>
              ✊
            </button>
            <button
              className="w-1/3 border-l h-14"
              onClick={() => onClickUserResult(2)}
            >
              ✋
            </button>
          </div>
        </div>
      </div>
      {resultModal && (
        <>
          <div
            className="absolute w-full h-full top-0 left-0 bg-black opacity-50"
            onClick={onClickReGame}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center text-6xl lg:text-9xl font-extrabold drop-shadow-lg shadow-black text-yellow-300 animate-fadeIn">
            {gameResult}
          </div>
        </>
      )}
      {gameResult === "승리!" && <Confetti />}
    </div>
  );
};

export default Home;

import { useEffect, useState } from 'react';
import video from '../assets/media-with-intro.mp4';
import poster from '../assets/posterframe.jpg';
import iconic from '../assets/iconic-final-circle.png';
import playIcon from '../assets/test-inactive.svg';
import shirtIconBG from '../assets/shirt-icon-background.svg';
import shirtIconFG from '../assets/shirt-icon-foreground.svg';
// import playIcon from '../assets/play-solid-blue-21px.svg';

const START_TIME = 0;
const productRanges = [
  {
    start: 6.5,
    end: 15.5,
  },
  {
    start: 17.5,
    end: 21.3,
  },
  {
    start: 23.5,
    end: 38,
  },
  {
    start: 39.3,
    end: 44,
  },
  {
    start: 56.5,
    end: 60.1,
  },
  {
    start: 65.1,
    end: 74.3,
  },
  {
    start: 105.6,
    end: 117,
  },
  {
    start: 156,
    end: 158,
  },
  {
    start: 191.2,
    end: 196.8,
  },
  {
    start: 201.4,
    end: 211.5,
  },
  {
    start: 218.3,
    end: 224,
  },
  {
    start: 232.6,
    end: 234,
  },
  // {
  //   start: 3,
  //   end: 23400,
  // },
]
const Apollo = () => {

  const togglePlayState = () => {
    const video = document.getElementById('video-player');
    console.log('video.paused: ', video.paused)
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  const toggleMute = () => {
    const video = document.getElementById('video-player');
    console.log('video.currentTime: ', video.currentTime)
    if (video.volume !== 0) {
      video.volume = 0;
    } else {
      video.volume = 1;
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const video = document.getElementById('video-player');
      let liveProduct = false;
      productRanges.forEach(({start, end}) => {
        if (video.currentTime >= start && video.currentTime <= end) {
          liveProduct = true;
        }
      })
      if (liveProduct) {
        setProductPopperState(prev => 'foreground');
      } else {
        setProductPopperState(prev => prev === 'foreground' ? 'background' :  prev);
      }
    }, 100);
    const video = document.getElementById('video-player');
    window.v = video;
    video.volume = 0;
    video.play();
    video.currentTime = START_TIME;

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const [pressedState, setPressedState] = useState('');
  const [productPopperState, setProductPopperState] = useState('initial');

  const shirtIcon = shirtIconFG;
  // const shirtIcon = productPopperState === 'background' ? shirtIconBG : shirtIconFG;

  return (
    <>
      <div className='apollo-shell'>
        <div className='apollo-media-container'>
          
          <video id='video-player' className='apollo-main-media main-border' src={video} autoplay controls={false} /> 

          <div className='apollo-overlay'>
            <div className='apollo-product-popper-glow' ></div>
            <div className={`apollo-product-popper ${productPopperState}`} onClick={()=>{window.open('https://huckberry.com/store/flint-and-tinder/category/p/55166-flannel-lined-waxed-trucker-jacket', "_blank");}} ></div>
            <img src={shirtIcon} className='apollo-product-popper-icon' />

            <div className='apollo-popper-glow' ></div>
            <div className={`apollo-popper ${pressedState}`} onMouseDown={() => setPressedState('pressed')} onMouseUp={() => setPressedState('')} onClick={toggleMute}></div>
            {/* <div className={`apollo-popper ${pressedState}`} onMouseDown={() => setPressedState('pressed')} onMouseUp={() => setPressedState('')} onClick={togglePlayState}></div> */}
            <img src={playIcon} className='apollo-popper-icon' />

          </div>

        </div>
      </div>
      {/* <div className='pie no-round'></div> */}
    </>
  );
}

export default Apollo;
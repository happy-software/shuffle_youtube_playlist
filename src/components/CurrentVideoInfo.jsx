import React from 'react';

function CurrentVideoInfo(props) {
  const titleOpts = {
    flex: 1
  }
  const anchorOpts = {
    paddingLeft: 3, 
    paddingRight: 10,
    flex: 0
  }

  function fitText(outputSelector){
    // max font size in pixels
    const maxFontSize = 50;
    // get the DOM output element by its selector
    let outputDiv = document.getElementById(outputSelector);
    // get element's width
    let width = outputDiv.clientWidth;
    // get content's width
    let contentWidth = outputDiv.scrollWidth;
    // get fontSize
    let fontSize = parseInt(window.getComputedStyle(outputDiv, null).getPropertyValue('font-size'),10);
    // if content's width is bigger then elements width - overflow
    if (contentWidth > width){
        fontSize = Math.ceil(fontSize * width/contentWidth,10);
        fontSize =  fontSize > maxFontSize  ? fontSize = maxFontSize  : fontSize - 1;
        outputDiv.style.fontSize = fontSize+'px';   
    }else{
        // content is smaller then width... let's resize in 1 px until it fits 
        while (contentWidth === width && fontSize < maxFontSize){
            fontSize = Math.ceil(fontSize) + 1;
            fontSize = fontSize > maxFontSize  ? fontSize = maxFontSize  : fontSize;
            outputDiv.style.fontSize = fontSize+'px';   
            // update widths
            width = outputDiv.clientWidth;
            contentWidth = outputDiv.scrollWidth;
            if (contentWidth > width){
                outputDiv.style.fontSize = fontSize-1+'px'; 
            }
        }
    }
}

  return(
    <>
    <div id="videoTitleDisplay" className='currentVideoTitle' onClick={() => props.setCollapseDescription(!props.collapseDescription)}>
      <div style={titleOpts}>{props.currentVideo.title}</div>
      <a style={anchorOpts} href={`https://youtube.com/watch?v=${props.currentVideo.video_id}`} target="_blank" rel="noopener noreferrer">
        <img alt='Go to Youtube' src={'/arrow-up-right.svg'}></img>
      </a>
    </div>

    <div className="contentRow">
      <div className={`${props.collapseDescription ? 'hide' : ''}`}>
        {props.currentVideo.description}
      </div>
    </div>
    </>
  );
}

export default CurrentVideoInfo;
import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
    const [isExplained, setIsExplained]=useState(false)
    const [height, setHeight]=useState(0)
    const contentRef=useRef(null)

    useEffect(()=>{
        if(isExplained){
            const contentHeight=contentRef.current.scrollHeight;
            setHeight(contentHeight+10)
        }else{
            setHeight(0)
        }
    }, [isExplained])

    const toggleExpand=()=>{
        setIsExplained(!isExplained);
    }

  return <div>QuestionCard</div>;
};

export default QuestionCard;

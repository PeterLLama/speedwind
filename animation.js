import React, { useState } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
import { TypeAnimation } from "react-type-animation";
import { addPropertyControls, ControlType } from "framer";

/*
 * Typing Animation
 * By Kanishak M
 * Library Used : React type Animation
 * @framerIntrinsicWidth 200
 * @framerIntrinsicHeight 200
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function TypingAnimation({
  speed,
  options,
  font,
  RepeatType,
  RepeatValue
}) {
  const [currentColor, setCurrentColor] = useState(font.color);

  const sequenceArr = [];
  for (let i = 0; i < options.length; i++) {
    sequenceArr.push(options[i].text);
    sequenceArr.push(options[i].duration);
  }

  const changeColor = () => {
    // Генерируем случайный цвет RGB
    const newColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    setCurrentColor(newColor);
  };

  return /*#__PURE__*/_jsx(TypeAnimation, {
    sequence: sequenceArr,
    wrapper: "span",
    speed: speed,
    style: {
      ...font.font,
      color: currentColor,
      display: "flex",
      alignItems: font.alignItems,
      justifyContent: font.justifyContent,
      margin: 0,
      padding: 0,
      width: "100%",
      height: "100%",
      position: "relative"
    },
    repeat: RepeatType ? Infinity : RepeatValue,
    cursor: false,
    onComplete: changeColor // Вызываем функцию при завершении анимации

  });
}

addPropertyControls(TypingAnimation, {
  options: {
    type: ControlType.Array,
    control: {
      type: ControlType.Object,
      controls: {
        text: {
          type: ControlType.String,
          defaultValue: "Typing String"
        },
        duration: {
          type: ControlType.Number,
          displayStepper: true,
          defaultValue: 1000
        }
      }
    },
    defaultValue: [{
      text: "I am a developer.",
      duration: 1000
    }, {
      text: "I am a designer.",
      duration: 1000
    }]
  },
  RepeatType: {
    type: ControlType.Boolean,
    title: "RepeatType",
    enabledTitle: "Infinite",
    disabledTitle: "Specific",
    defaultValue: true
  },
  RepeatValue: {
    type: ControlType.Number,
    displayStepper: true,
    hidden(props) {
      return props.RepeatType === true;
    },
    defaultValue: 2
  },
  speed: {
    type: ControlType.Number,
    displayStepper: true,
    defaultValue: 50
  },
  font: {
    type: ControlType.Object,
    controls: {
      font: {
        type: "font",
        controls: "extended"
      },
      color: {
        type: ControlType.Color,
        defaultValue: "#ffffff"
      },
      alignItems: {
        type: ControlType.Enum,
        displaySegmentedControl: true,
        title: "alignItems",
        options: ["start", "center", "end"],
        optionTitles: ["Left", "Center", "Right"],
        defaultValue: "center"
      },
      justifyContent: {
        type: ControlType.Enum,
        displaySegmentedControl: true,
        title: "justifyContent",
        options: ["left", "center", "right"],
        optionTitles: ["Left", "Center", "Right"],
        defaultValue: "center"
      }
    }
  }
});

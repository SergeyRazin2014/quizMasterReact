// @ts-nocheck
import React, { useEffect } from 'react';
import SunEditor from "suneditor-react";
import './index.css';

export const SunEditorShow = ({ text }) => {

    useEffect(() => {

        const elements = document.getElementsByClassName('se-wrapper-inner');
        if (elements && elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                element.style.height = "auto";
            }
        }

        const toolbarLine = document.getElementsByClassName('se-toolbar');
        if (toolbarLine && toolbarLine.length > 0) {
            for (let i = 0; i < toolbarLine.length; i++) {
                const element = toolbarLine[i];
                element.style.display = "none";
            }
        }


    }, []);

    return (
        <>
            <SunEditor
                lang="ru"
                setOptions={{
                    buttonList: []
                }}
                disable={true}
                setContents={text} />
        </>
    );
};

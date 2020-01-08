// @ts-nocheck
import React, { useEffect } from 'react';
import SunEditor from "suneditor-react";

export const SunEditorShow = ({ text }) => {

    useEffect(() => {
        const elements = document.getElementsByClassName('se-wrapper-inner');
        if (elements && elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                element.style.height = "auto";
            }
        }
    }, []);

    return (
        <>
            <p>Результат:</p>
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

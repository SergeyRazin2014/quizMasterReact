import React from "react";
import useForm from "src/useCases/useForm";

const config = {
    form: "testForm",
    initialValues: { first: "Steve", last: "Stevenson" },
    onSubmit: values => alert(JSON.stringify(values, null, 2))
};

export default function Test() {
    const { store, useField, reset, handleSubmit } = useForm(config);

    const first = useField("first");
    const last = useField("last");

    return (
        <div className="App">
            <fieldset>
                <legend>Form</legend>
                <form onSubmit={handleSubmit}>
                    <div>
                        First: <input {...first.input} />
                    </div>
                    <div>
                        Last: <input {...last.input} />
                    </div>
                    <div>
                        <button type="button" onClick={reset}>
                            Reset
            </button>{" "}
                        <button>Submit</button>
                    </div>
                </form>
            </fieldset>

            <fieldset>
                <legend>Store</legend>
                <pre>{JSON.stringify(store, null, 2)}</pre>
            </fieldset>
        </div>
    );
}

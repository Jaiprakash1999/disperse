import React from "react";

const AddressInput = ({ addresses, setAddresses }) => {
    const handleInputChange = (e) => {
        setAddresses(e.target.value.split("\n"));
    };

    return (
        <div className="input-container ">
            <label className="header_text">Addresses with Amounts</label>
            <div className="textarea-container">
                <div className="line-numbers">
                    {addresses.map((_, index) => (
                        <div key={index} className="line-number">
                            {index + 1}
                        </div>
                    ))}
                </div>
                <textarea
                    rows="12"
                    cols="50"
                    className="auto-expand"
                    value={addresses.join("\n")}
                    onChange={handleInputChange}
                    placeholder="Enter Addresses with Amount"
                />
            </div>
            <span className="bottom-tetx">Separated by "," or " " or "="</span>
        </div>
    );
};

export default AddressInput;

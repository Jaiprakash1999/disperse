import React, { useState } from "react";
import "./styles.css";

const Disperse = () => {
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState([]);
    const [duplicateErrors, setDuplicateErrors] = useState([]);

    const validateAddresses = (addressList) => {
        const addressSet = new Set();
        const formatErrors = [];
        let duplicateErrors = [];
        const invalidAmountErrors = [];

        addressList.forEach((line, index) => {
            const parts = line.trim().split(/[,= ]+/);
            if (parts.length !== 2) {
                formatErrors.push(`Line ${index + 1} has an incorrect format.`);
            } else {
                const [address, amount] = parts;
                if (
                    !/^0x[a-fA-F0-9]{40}$/.test(address) ||
                    isNaN(parseFloat(amount))
                ) {
                    formatErrors.push(
                        `Line ${index + 1} has an invalid address or amount.`
                    );
                } else if (addressSet.has(address)) {
                    const duplicateIndexes = [];
                    addressList.forEach((addrLine, i) => {
                        const [addr] = addrLine.trim().split(/[,= ]+/);
                        if (addr === address) {
                            duplicateIndexes.push(i + 1);
                        }
                    });
                    duplicateErrors.push(
                        `Address ${address} encountered duplicate in Line: ${duplicateIndexes.join(
                            ", "
                        )}`
                    );
                    duplicateErrors = [...new Set(duplicateErrors)];
                } else {
                    addressSet.add(address);
                    if (!/^\d+(\.\d+)?$/.test(amount)) {
                        invalidAmountErrors.push(
                            `Line ${index + 1} Wrong amount.`
                        );
                    }
                }
            }
        });

        const allErrors = [
            ...formatErrors,
            ...duplicateErrors,
            ...invalidAmountErrors,
        ];
        setError(allErrors);

        if (allErrors.length === 0) {
            setDuplicateErrors([]);
        } else {
            setDuplicateErrors(duplicateErrors);
        }
    };

    const handleKeepFirstOne = () => {
        const uniqueAddresses = [];
        const seenAddresses = new Set();

        addresses.forEach((line) => {
            const [address] = line.trim().split(/[,= ]+/);
            if (!seenAddresses.has(address)) {
                uniqueAddresses.push(line);
                seenAddresses.add(address);
            }
        });

        setAddresses(uniqueAddresses);
        setError([]);
        setDuplicateErrors([]);
    };

    const handleCombineBalances = () => {
        setAddresses([]);
        const combined = {};
        addresses.forEach((line) => {
            const [address, amount] = line.trim().split(/[,= ]+/);
            combined[address] = (combined[address] || 0) + parseFloat(amount);
        });
        const combinedResult = Object.entries(combined).map(
            ([address, amount]) => `${address} ${amount}`
        );
        setDuplicateErrors([]);
        setAddresses([...combinedResult]);
        setError([]);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const inputAddresses = addresses.join("\n").split("\n");
        validateAddresses(inputAddresses);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="input-container ">
                    <label className="header_text">
                        Addresses with Amounts{" "}
                    </label>
                    <textarea
                        rows="10"
                        cols="50"
                        value={addresses.join("\n")}
                        onChange={(e) =>
                            setAddresses(e.target.value.split("\n"))
                        }
                        placeholder="Enter Addresses with Amount"
                    />
                </div>
                {duplicateErrors.length > 0 && (
                    <div className="header">
                        <span className="button-text ">Duplicated</span>
                        <div>
                            <button
                                onClick={handleKeepFirstOne}
                                className="button-text "
                            >
                                Keep the First One
                            </button>
                            <button
                                onClick={handleCombineBalances}
                                className="button-text "
                            >
                                Combine Balances
                            </button>
                        </div>
                    </div>
                )}
                {error.length > 0 ? (
                    <div className="error-container">
                        <div className="icon">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z"
                                    fill="red"
                                ></path>
                                <path
                                    d="M12 14a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1zm-1.5 2.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"
                                    fill="red"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <div className="text">
                                {error.map((errorMsg) => {
                                    return (
                                        <div key={errorMsg}>
                                            <span>{errorMsg}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : null}
                <div
                    className="next-button"
                    type="submit"
                    role="presentation"
                    onClick={onSubmit}
                >
                    <button className="next">Next</button>
                </div>
            </form>
        </div>
    );
};

export default Disperse;

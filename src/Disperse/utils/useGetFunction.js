import { useState } from "react";

const useGetFunction = () => {
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
                    addressSet.add(address);
                    if (!/^\d+(\.\d+)?$/.test(amount)) {
                        invalidAmountErrors.push(
                            `Line ${index + 1} Wrong amount.`
                        );
                    }
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
            ...invalidAmountErrors,
            ...formatErrors,
            ...duplicateErrors,
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
    return {
        addresses,
        setAddresses,
        handleKeepFirstOne,
        handleCombineBalances,
        error,
        duplicateErrors,
        onSubmit,
    };
};

export default useGetFunction;

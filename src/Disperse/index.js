import "./styles.css";
import AddressInput from "./InputBox";
import ActionButtons from "./ActionButton";
import ErrorMessage from "./ErrorMessage";
import useGetFunction from "./utils/useGetFunction";

const Disperse = () => {
    const {
        addresses,
        setAddresses,
        handleKeepFirstOne,
        handleCombineBalances,
        error,
        duplicateErrors,
        onSubmit,
    } = useGetFunction();

    return (
        <div>
            <form onSubmit={onSubmit}>
                <AddressInput
                    addresses={addresses}
                    setAddresses={setAddresses}
                />

                {duplicateErrors.length > 0 && (
                    <ActionButtons
                        handleKeepFirstOne={handleKeepFirstOne}
                        handleCombineBalances={handleCombineBalances}
                    />
                )}
                {error.length > 0 && <ErrorMessage error={error} />}

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

import React from "react";

const ActionButtons = ({ handleKeepFirstOne, handleCombineBalances }) => {
    return (
        <div className="header">
            <span className="button-text ">Duplicated</span>
            <div>
                <button onClick={handleKeepFirstOne} className="button-text">
                    Keep the First One
                </button>
                <button onClick={handleCombineBalances} className="button-text">
                    Combine Balances
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;

import React from "react";

const ErrorMessage = ({ error }) => {
    return (
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
                    {error.map((errorMsg, index) => (
                        <div key={index}>
                            <span>{errorMsg}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;

import React from "react";
import { AlertProps } from '../types/components';

const Alert: React.FC<AlertProps> = ({ type, message = "Your Message Here", onClose }) => {
    switch (type) {
        case "INFO": {
            return (
                <div className="bg-blue-50 border border-blue-400 rounded text-blue-800 text-sm p-4 flex items-start">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="w-full">
                        <p>
                            <span className="font-bold">Info:</span>
                            {message}
                        </p>
                        <button
                            onClick={onClose}
                            className="border-blue-400 bg-white hover:bg-gray-50 px-4 py-2 mt-4 border rounded font-bold"
                        >
                            Understood
                        </button>
                    </div>
                    <button
                        className=""
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            );
        }

        case "ERROR": {
            return (
                <div className="bg-red-50 border border-red-400 rounded text-red-800 text-sm p-4 flex items-start">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="w-full">
                        <p>
                            <span className="font-bold">Error:</span>
                            {message}
                        </p>
                        <button
                            onClick={onClose}
                            className="border-red-400 bg-white hover:bg-gray-50 px-4 py-2 mt-4 border rounded font-bold"
                        >
                            Understood
                        </button>
                    </div>
                    <button
                        className=""
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            );
        }

        case "WARNING": {
            return (
                <div className="bg-yellow-50 border border-yellow-400 rounded text-yellow-800 text-sm p-4 flex items-start">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="w-full">
                        <p>
                            <span className="font-bold">Warning:</span>
                            {message}
                        </p>
                        <button
                            onClick={onClose}
                            className="border-yellow-400 bg-white hover:bg-gray-50 px-4 py-2 mt-4 border rounded font-bold"
                        >
                            Understood
                        </button>
                    </div>
                    <button
                        className=""
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            );
        }

        default: {
            return (
                <div className="bg-green-50 border border-green-400 rounded text-green-800 text-sm p-4 flex items-start">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="w-full">
                        <p>
                            <span className="font-bold">Success:</span>
                            {message}
                        </p>
                        <button
                            onClick={onClose}
                            className="border-green-400 bg-white hover:bg-gray-50 px-4 py-2 mt-4 border rounded font-bold"
                        >
                            Understood
                        </button>
                    </div>
                    <button
                        className=""
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            );
        }
    }
};

export default Alert; 
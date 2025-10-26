import React from "react";

export default function Home() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                padding: "80px",
                fontFamily: "Roboto",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                }}
            >
                <h1
                    style={{
                        fontSize: "72px",
                        fontWeight: "bold",
                        marginBottom: "20px",
                        color: "#1a1a1a",
                        fontFamily: "Oswald",
                    }}
                >
                    Portfolio
                </h1>
                <p
                    style={{
                        fontSize: "32px",
                        color: "#666666",
                        marginTop: "0",
                    }}
                >
                    Your Name
                </p>
                <p
                    style={{
                        fontSize: "24px",
                        color: "#999999",
                        marginTop: "40px",
                    }}
                >
                    2025
                </p>
            </div>
        </div>
    );
}

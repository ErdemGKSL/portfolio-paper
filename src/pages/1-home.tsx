import React from "react";

export default function Home() {
    return (
        <div
            className="section"
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
                    data-role="document-title"
                    style={{
                        fontSize: "576px",
                        fontWeight: "bold",
                        marginBottom: "160px",
                        color: "#1a1a1a",
                        fontFamily: "Oswald",
                    }}
                >
                    Portfolio
                </h1>
                <p
                    data-role="name"
                    style={{
                        fontSize: "256px",
                        color: "#666666",
                        marginTop: "0",
                    }}
                >
                    Your Name
                </p>
                <p
                    data-role="date"
                    style={{
                        fontSize: "192px",
                        color: "#999999",
                        marginTop: "320px",
                    }}
                >
                    2025
                </p>
            </div>
        </div>
    );
}

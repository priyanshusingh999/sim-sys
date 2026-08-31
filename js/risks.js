// ==========================================
// RISKS & DELAYS
// ==========================================

const risksData = [

    {
        activity: "Foundation Work",
        risk: "Material delay",
        severity: "High"
    },

    {
        activity: "RCC Structure",
        risk: "Labour shortage",
        severity: "Medium"
    },

    {
        activity: "Electrical Work",
        risk: "Pending inspection",
        severity: "Low"
    }

];


// ==========================================
// LOAD RISKS
// ==========================================

function loadRisks() {

    const container =
        document.getElementById("riskContainer");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    risksData.forEach(function (risk) {

        const riskCard =
            document.createElement("div");


        riskCard.className = "risk-card";


        riskCard.innerHTML = `

            <h3>${risk.activity}</h3>

            <p>${risk.risk}</p>

            <strong>
                Severity: ${risk.severity}
            </strong>

        `;


        container.appendChild(riskCard);

    });

}
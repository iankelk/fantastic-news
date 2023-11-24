// Create a simple database of texts and pictures
facts = [
    {
        name: "shane.jpg",
        fact: "the two main companies behind this sort of targeted advertisement," +
            " taboola and Outbrain, made almost" +
            " <span style=\"font-weight: bold; color: red\">2.4 billion dollars in revenue</span> in 2021?",
        sources:
            [
                "Taboola earnings report for 2021",
            "https://www.sec.gov/ix?doc=/Archives/edgar/data/0001840502/000114036122010978/brhc10035439_20f.htm",
            "Outbrain earnings report for 2021",
                "https://investors.outbrain.com/node/7086/html"
            ]},
    {
        name: "pants.jpg",
        fact: "the U.S. Federal Trade Commission found that these weight-loss ads" +
            " get consumers to share their credit card information " +
            "but <span style=\"font-weight: bold; color: red\">never deliver any product?</span>",
        sources: ["Prepared Statement of the Federal Trade Commission",
            "https://www.ftc.gov/system/files/documents/public_statements/316321/140617falsedecepweightloss.pdf"]},
    {
        name: "pills.jpg",
        fact: "a 2018 study on Twitter found that the top 1% of fake news spread to " +
            " <span style=\"font-weight: bold; color: red\">1000 to 100,000 people</span>, but that the top 1% of " +
            "<span style=\"font-weight: bold; color: red\">true</span> news rarely reached" +
            " <span style=\"font-weight: bold; color: red\">  1000 people? </span>",
        sources: ["The spread of true and false news online",
        "https://www.science.org/doi/10.1126/science.aap9559"]
    }
]

// Show the facts in the div when clicking on the pictures
d3.selectAll(".chumbox").data(facts).on("click", (event, d)=> {
    document.getElementById("factline").innerHTML =`<p>...${d.fact}</p>`;
})
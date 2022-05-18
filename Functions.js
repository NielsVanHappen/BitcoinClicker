//Main
    // Arrays
    var Upgrades = [];
    var ActUps = [];
    var BoughtUpgradesIndex = [];
    var Achievements = [];
    var UnlockedAchievements = [];
    
    // Stats
    var BTCGainAll = 0;
    var BTCSpentAll = 0;
    var BTCMaxAmt = 0;
    var GenSpent = 0;
    var TotalGenerators = 0;
    var GenBTC = 0;
    var Clicks = 0;
    var ClickBTC = 0;
    var UpsSpent = 0;
    var BoughtUpgrades = 0;
    var AchievementsAmount = 0;
    var TimePlayed = 0;
    var UpgradesSet = false;

    //Number converter; 
    function NumConvert(num, dec, round) {
        var Abbrev = ["K", "M", "B", "T", "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP",
                    "AQ", "AR", "AS", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ", "BA", "BB", "BC", "BD", "BE", "BF", "BG", "BH", "BI",
                    "BJ", "BK", "BL", "BM", "BN", "BO", "BP", "BQ", "BR", "BS", "BS", "BT", "BU", "BV", "BW", "BX", "BY", "BZ", "%"]
        for (var i = Abbrev.length-1; i>=0; i--) {
            var size = Math.pow(10,(i+1)*3);
    
            if (size <= num && round == 'f') {
                num = Math.floor(num) / size;
                num = num.toFixed(dec);
                num += " " + Abbrev[i];
                break;
            }
            else if (size <= num && round == 'c') {
                num = Math.ceil(num) / size;
                num = num.toFixed(dec);
                num += " " + Abbrev[i];
                break;
            }
        }
        return num;
    }

// Functions
// Tabs

    $("#SettingsButton").on("click", function() {SwitchTabs('Settings')});
    $("#StatsButton").on("click", function() {SwitchTabs('Stats')});
    $("#AchievementsButton").on("click", function() {SwitchTabs('Achievements')});
    function SwitchTabs(active) {
        $(".TabsButton").removeClass("br").addClass("y");
        $(".Tab").addClass("Inactive");
        switch(active) {
            case 'Settings':
                $("#SettingsButton").removeClass("y").addClass("br");
                $("#SettingsTab").removeClass("Inactive");
                break;
            case 'Stats': 
                $("#StatsButton").removeClass("y").addClass("br");
                $("#StatsTab").removeClass("Inactive");
                break;
            case 'Achievements':
                $("#AchievementsButton").removeClass("y").addClass("br");
                $("#AchievementsTab").removeClass("Inactive");
                break;
            default:
                $("#SettingsButton").removeClass("y").addClass("br");
                $("#SettingsTab").removeClass("Inactive");
        }
    }

// Bitcoin
    var Bitcoins = 0;
    var BitcoinsPC = 1;
    var AbacusBPS = 0.1;
    var GrandpaBPS = 1;
    var MinRigBPS = 10;
    var HackerBPS = 1E2;
    var PrivServBPS = 1E3;
    var ClonMachBPS = 1E4;
    var QuanCompBPS = 1E5;
    var GalaxyBPS = 1E6;
    var UniverseBPS = 1E7;
    var MultiverseBPS = 1E8;
    var MultiplierPC = 0;
    var BitcoinsPS = 0;

    // Update the site title
    var ShowBtcAmt = false;
    function UpdateTitle() {
        if (Bitcoins > 0 || ShowBtcAmt == true) {
            if (Bitcoins >= 1000) {
                ShowBtcAmt = true;
                document.title = NumConvert(Bitcoins, 2, 'f') + " bitcoins - Bitcoin Clicker";
            }
            else if (Math.floor(Bitcoins) == 1) {
                ShowBtcAmt = true;
                document.title = Math.floor(Bitcoins) + " bitcoin - Bitcoin Clicker";
            }
            else {
                ShowBtcAmt = true;
                document.title = Math.floor(Bitcoins) + " bitcoins - Bitcoin Clicker";
            }
        }
        else {
            document.title = "Bitcoin Clicker";
        }
    }

    // Update the BTC amount and BTCps
    function UpdateCounts() {
        if (Bitcoins >= 1000) {
            document.getElementById("BtcAmtText").innerHTML = NumConvert(Bitcoins, 2, 'f') + " bitcoins";
        }
        else if (Math.floor(Bitcoins) == 1) {
            document.getElementById("BtcAmtText").innerHTML = Math.floor(Bitcoins) + " bitcoin";
        }
        else {
            document.getElementById("BtcAmtText").innerHTML = Math.floor(Bitcoins) + " bitcoins";
        }

        var BitcoinsPS = AbacusOwned * AbacusBPS + GrandpaOwned * GrandpaBPS + MiningRigOwned * MinRigBPS  + HackerOwned * HackerBPS +
                         PrivateServerOwned * PrivServBPS + CloningMachineOwned * ClonMachBPS + QuantumComputerOwned * QuanCompBPS + GalaxyOwned * GalaxyBPS +
                         UniverseOwned * UniverseBPS + MultiverseOwned * MultiverseBPS
        if (BitcoinsPS >= 1000) {
            document.getElementById("BtcPsText").innerHTML = "+" + NumConvert(BitcoinsPS, 2, 'f') + " bitcoins per second";
        }
        else if (BitcoinsPS.toFixed(1) == 1.0) {
            document.getElementById("BtcPsText").innerHTML = "+" + BitcoinsPS.toFixed(1) + " bitcoin per second";
        }
        else {
            document.getElementById("BtcPsText").innerHTML = "+" + BitcoinsPS.toFixed(1) + " bitcoins per second";
        }
        
    }

    // Adds BTC per click
    function ClickBitcoin() {
        var PS = AbacusOwned * AbacusBPS + GrandpaOwned * GrandpaBPS + MiningRigOwned * MinRigBPS  + HackerOwned * HackerBPS +
                 PrivateServerOwned * PrivServBPS + CloningMachineOwned * ClonMachBPS + QuantumComputerOwned * QuanCompBPS + GalaxyOwned * GalaxyBPS +
                 UniverseOwned * UniverseBPS + MultiverseOwned * MultiverseBPS;
        Clicks += 1;
        Bitcoins += BitcoinsPC + PS * MultiplierPC;
        ClickBTC += BitcoinsPC + PS * MultiplierPC;
        BTCGainAll += BitcoinsPC + PS * MultiplierPC;
        CheckActUps("Click", Clicks)
    }

    // Adds BTC per second
    function BTCpsGrad() {
        var BitcoinsPS = AbacusOwned * AbacusBPS + GrandpaOwned * GrandpaBPS + MiningRigOwned * MinRigBPS  + HackerOwned * HackerBPS +
                         PrivateServerOwned * PrivServBPS + CloningMachineOwned * ClonMachBPS + QuantumComputerOwned * QuanCompBPS + GalaxyOwned * GalaxyBPS +
                         UniverseOwned * UniverseBPS + MultiverseOwned * MultiverseBPS;
        if (IncreaseGrad) {
            Bitcoins += BitcoinsPS / 20;
            GenBTC += BitcoinsPS / 20;
            BTCGainAll += BitcoinsPS / 20;
        }
    }

    function BTCps() {
        var BitcoinsPS = AbacusOwned * AbacusBPS + GrandpaOwned * GrandpaBPS + MiningRigOwned * MinRigBPS  + HackerOwned * HackerBPS +
                         PrivateServerOwned * PrivServBPS + CloningMachineOwned * ClonMachBPS + QuantumComputerOwned * QuanCompBPS + GalaxyOwned * GalaxyBPS +
                         UniverseOwned * UniverseBPS + MultiverseOwned * MultiverseBPS;
        if (!IncreaseGrad) {
            Bitcoins += BitcoinsPS;
            GenBTC += BitcoinsPS;
            BTCGainAll += BitcoinsPS;
        }
    }

// Shop
    // MultiText
    var MultiAmount = 1;
    var multiplier = document.getElementById("Multiplier")
    multiplier.addEventListener("click", function() {
    switch(multiplier.innerHTML) {
        case "Buy: 1":
        multiplier.innerHTML = "Buy: 10";
        MultiAmount = 10;
        break;
        case "Buy: 10":
        multiplier.innerHTML = "Buy: 50";
        MultiAmount = 50;
        break;
        case "Buy: 50":
        multiplier.innerHTML = "Buy: max";
        MultiAmount = 100;
        break;
        case "Buy: max":
        multiplier.innerHTML = "Buy: 1";
        MultiAmount = 1;
        break;
        default:
        multiplier.innerHTML = "Buy: 1";
        MultiAmount = 1;
    }
    });

    // Items
    var AbacusOwned = 0;
    var GrandpaOwned = 0;
    var MiningRigOwned = 0;
    var HackerOwned = 0;
    var PrivateServerOwned = 0;
    var CloningMachineOwned = 0;
    var QuantumComputerOwned = 0;
    var GalaxyOwned = 0;
    var UniverseOwned = 0;
    var MultiverseOwned = 0;

    function ItemStats() {
        ItemBlock("Item10", 1E10, MultiverseOwned, "Multiverse", MultiverseBPS);
        AutoBuyGenerators(1E10, MultiverseOwned, 10);
        ItemBlock("Item9", 1E9, UniverseOwned, "Universe", UniverseBPS);
        AutoBuyGenerators(1E9, UniverseOwned, 9);
        ItemBlock("Item8", 1E8, GalaxyOwned, "Galaxy", GalaxyBPS);
        AutoBuyGenerators(1E8, GalaxyOwned, 8);
        ItemBlock("Item7", 1E7, QuantumComputerOwned, "Quantum Computer", QuanCompBPS);
        AutoBuyGenerators(1E7, QuantumComputerOwned, 7);
        ItemBlock("Item6", 1E6, CloningMachineOwned, "Cloning Machine", ClonMachBPS);
        AutoBuyGenerators(1E6, CloningMachineOwned, 6);
        ItemBlock("Item5", 1E5, PrivateServerOwned, "Private Server", PrivServBPS);
        AutoBuyGenerators(1E5, PrivateServerOwned, 5);
        ItemBlock("Item4", 1E4, HackerOwned, "Hacker", HackerBPS);
        AutoBuyGenerators(1E4, HackerOwned, 4);
        ItemBlock("Item3", 1E3, MiningRigOwned, "Mining Rig", MinRigBPS);
        AutoBuyGenerators(1E3, MiningRigOwned, 3);
        ItemBlock("Item2", 1E2, GrandpaOwned, "Grandpa", GrandpaBPS);
        AutoBuyGenerators(1E2, GrandpaOwned, 2);
        ItemBlock("Item1", 10, AbacusOwned, "Abacus", AbacusBPS);
        AutoBuyGenerators(10, AbacusOwned, 1);
    }

    var GrowthRate = 1.1;

    function ItemBlock(Item, BasePrice, AmtOwned, ItemName, BPS) {
        var Interactable = false;
        var PriceText = "Error";
        var ItemTitle = "Error";
        var Price1 = Price(1, BasePrice, AmtOwned);
        var Price10 = Price(10, BasePrice, AmtOwned);
        var Price50 = Price(50, BasePrice, AmtOwned);
        var PriceMax = Price(MultiMax(BasePrice, AmtOwned), BasePrice, AmtOwned)
        
        // Check if interactable
        if (Bitcoins >= Price1 && MultiAmount == 1) Interactable = true;
        else if (Bitcoins >= Price10 && MultiAmount == 10) Interactable = true;
        else if (Bitcoins >= Price50 && MultiAmount == 50) Interactable = true;
        else if (Bitcoins >= Price1 && MultiAmount == 100)
        {
        if (PriceMax == 0)
        {
            Interactable = false;
        }
        else Interactable = true;
        }
        SetActive(Item, Interactable);
        
        // Change text
        let title = document.getElementById(Item+"Title");
        switch(MultiAmount) {
            case 1:
                PriceText = "" + NumConvert(Price1, 2, 'c');
                break;
            case 10:
                PriceText = "" + NumConvert(Price10, 2, 'c');
                break;
            case 50: 
                PriceText = "" + NumConvert(Price50, 2, 'c');
                break;
            case 100: 
                if (PriceMax == 0) {
                    PriceText = "" + NumConvert(Price1, 2, 'c');
                    ItemTitle = ItemName + " 1x";
                    title.innerHTML = ItemTitle
                }
                else {
                    PriceText = "" + NumConvert(PriceMax, 2, 'c');
                    ItemTitle = ItemName + " " + MultiMax(BasePrice, AmtOwned) + "x";
                }
                break;
        }
        if (MultiAmount != 100) {
            title.innerHTML = ItemName + " " + MultiAmount + "x";
        }
        else title.innerHTML = ItemTitle;

        // Set PriceText
        document.getElementById(Item+"Price").innerHTML = "Price: " + PriceText + "<br>Each generates: " + NumConvert(BPS, 0, 'f') + " BTC per second";

        CheckActUps(ItemName, AmtOwned)
    }

    // Set item active
    function SetActive(Item, Interactable) {
        let item = document.getElementById(Item);
        if (Interactable == true) {
            item.classList.remove("Uninteractable");
        }
        else item.classList.add("Uninteractable");
    }

    // Calculate the price
    function Price(BuyNumber, BasePrice, AmtOwned) {
        return Math.floor(BasePrice * ((Math.pow(GrowthRate, AmtOwned) * (Math.pow(GrowthRate, BuyNumber) - 1)) / (GrowthRate - 1)));
    }

    // Calculate the max amount you can buy
    function MultiMax(BasePrice, AmtOwned) {
        return Math.floor(Math.log((((Bitcoins+.999) * (GrowthRate - 1)) / (BasePrice * Math.pow(GrowthRate, AmtOwned))) + 1) / Math.log(GrowthRate));
    }

    // Buy item(s)
    $("#Item1").on("click", Buy1);
    function Buy1() {
        AbacusOwned += BuyItem(10, AbacusOwned, "Abacus");
        AmtOwnedText()
    }
    $("#Item2").on("click", Buy2);
    function Buy2() {
        GrandpaOwned += BuyItem(1E2, GrandpaOwned, "Grandpa");
        AmtOwnedText()
    }
    $("#Item3").on("click", Buy3);
    function Buy3() {
        MiningRigOwned += BuyItem(1E3, MiningRigOwned, "Mining Rig");
        AmtOwnedText()
    }
    $("#Item4").on("click", Buy4);
    function Buy4() {
        HackerOwned += BuyItem(1E4, HackerOwned, 1E2, "Hacker");
        AmtOwnedText()
    }
    $("#Item5").on("click", Buy5);
    function Buy5() {
        PrivateServerOwned += BuyItem(1E5, PrivateServerOwned, "Private Server");
        AmtOwnedText()
    }
    $("#Item6").on("click", Buy6);
    function Buy6() {
        CloningMachineOwned += BuyItem(1E6, CloningMachineOwned, "Cloning Machine");
        AmtOwnedText()
    }
    $("#Item7").on("click", Buy7);
    function Buy7() {
        QuantumComputerOwned += BuyItem(1E7, QuantumComputerOwned, "Quantum Computer");
        AmtOwnedText()
    }
    $("#Item8").on("click", Buy8);
    function Buy8() {
        GalaxyOwned += BuyItem(1E8, GalaxyOwned, "Galaxy");
        AmtOwnedText()
    }
    $("#Item9").on("click", Buy9);
    function Buy9() {
        UniverseOwned += BuyItem(1E9, UniverseOwned, "Universe");
        AmtOwnedText()
    }
    $("#Item10").on("click", Buy10);
    function Buy10() {
        MultiverseOwned += BuyItem(1E10, MultiverseOwned, "Multiverse");
        AmtOwnedText()
    }
    function AmtOwnedText() {
        document.getElementById("Item1Owned").innerHTML = AbacusOwned;
        document.getElementById("Item2Owned").innerHTML = GrandpaOwned;
        document.getElementById("Item3Owned").innerHTML = MiningRigOwned;
        document.getElementById("Item4Owned").innerHTML = HackerOwned;
        document.getElementById("Item5Owned").innerHTML = PrivateServerOwned;
        document.getElementById("Item6Owned").innerHTML = CloningMachineOwned;
        document.getElementById("Item7Owned").innerHTML = QuantumComputerOwned;
        document.getElementById("Item8Owned").innerHTML = GalaxyOwned;
        document.getElementById("Item9Owned").innerHTML = UniverseOwned;
        document.getElementById("Item10Owned").innerHTML = MultiverseOwned;
    }

    function BuyItem(BasePrice, AmtOwned) {
        var MaxAmt = MultiMax(BasePrice, AmtOwned);
        var Price1 = Math.floor(Price(1, BasePrice, AmtOwned));
        var Price10 = Math.floor(Price(10, BasePrice, AmtOwned));
        var Price50 = Math.floor(Price(50, BasePrice, AmtOwned));
        var PriceMax = Math.floor(Price(MaxAmt, BasePrice, AmtOwned));
        var BuyAmt = 0;
        if (AutobuyGens && Bitcoins >= Math.floor(Price1)) {
            Bitcoins -= PriceMax;
            BTCSpentAll += PriceMax;
            GenSpent += PriceMax;
            BuyAmt += MaxAmt;
            TotalGenerators += MaxAmt;
        }
        else if (MultiAmount == 1 && Bitcoins >= Math.floor(Price1)) {
            Bitcoins -= Price1;
            BTCSpentAll += Price1;
            GenSpent += Price1;
            BuyAmt += MultiAmount;
            TotalGenerators += MultiAmount;
        }
        else if (MultiAmount == 10 && Bitcoins >= Math.floor(Price10)) {
            Bitcoins -= Price10;
            BTCSpentAll += Price10;
            GenSpent += Price10;
            BuyAmt += MultiAmount;
            TotalGenerators += MultiAmount;
        }
        else if (MultiAmount == 50 && Bitcoins >= Math.floor(Price50)) {
            Bitcoins -= Price50;
            BTCSpentAll += Price50;
            GenSpent += Price50;
            BuyAmt += MultiAmount;
            TotalGenerators += MultiAmount;
        }
        else if (MultiAmount == 100 && Bitcoins >= Math.floor(PriceMax)) {
            Bitcoins -= PriceMax;
            BTCSpentAll += PriceMax;
            GenSpent += PriceMax;
            BuyAmt += MaxAmt;
            TotalGenerators += MaxAmt;
        }
        ItemStats()
        return BuyAmt
    }

    //Upgrades
    function UpgradeStats() {
        if (!UpgradesSet) {
            MakeUpgrades("Item", "Item1", "Abacus", 10, "AbBPS");
            MakeUpgrades("Item", "Item2", "Grandpa", 1E2, "GrBPS");
            MakeUpgrades("Item", "Item3", "Mining Rig", 1E3, "MiBPS");
            MakeUpgrades("Item", "Item4", "Hacker", 1E4, "HaBPS");
            MakeUpgrades("Item", "Item5", "Private Server", 1E5, "PrBPS");
            MakeUpgrades("Item", "Item6", "Cloning Machine", 1E6, "ClBPS");
            MakeUpgrades("Item", "Item7", "Quantum Computer", 1E7, "QuBPS");
            MakeUpgrades("Item", "Item8", "Galaxy", 1E8, "GaBPS");
            MakeUpgrades("Item", "Item9", "Universe", 1E9, "UnBPS");
            MakeUpgrades("Item", "Item10", "Multiverse", 1E10, "MuBPS");
            MakeUpgrades("Click", "Click", "Click", 1E3, "MuPC");   
        }
    }

    function MakeUpgrades(Type, ItemNr, ItemName, BasePrice, Multiplied) {
        if (Type == "Item") {
            var Item10 = [ItemNr, ItemName+"1", 10, BasePrice*10, 0, 2, Multiplied];
            var Item25 = [ItemNr, ItemName+"2", 25, BasePrice*50, 0, 2, Multiplied];
            var Item50 = [ItemNr, ItemName+"3", 50, BasePrice*5E2, 0, 2, Multiplied];
            var Item100 = [ItemNr, ItemName+"4", 100, BasePrice*5E3, 0, 2, Multiplied];
            var Item200 = [ItemNr, ItemName+"5", 200, BasePrice*5E4, 0, 2, Multiplied];
            Upgrades.push(Item10);
            Upgrades.push(Item25);
            Upgrades.push(Item50);
            Upgrades.push(Item100);
            Upgrades.push(Item200);
        }
        else if (Type == "Click") {
            var Click100 = [ItemNr, ItemName+"1", 100, BasePrice, 0, 0.03, Multiplied];
            var Click500 = [ItemNr, ItemName+"2", 500, BasePrice*1E2, 0, 0.05, Multiplied];
            var Click1000 = [ItemNr, ItemName+"3", 1000, BasePrice*1E4, 0, 0.07, Multiplied];
            var Click2500 = [ItemNr, ItemName+"4", 2500, BasePrice*1E6, 0, 0.09, Multiplied];
            var Click5000 = [ItemNr, ItemName+"5", 5000, BasePrice*1E8, 0, 0.11, Multiplied];
            Upgrades.push(Click100);
            Upgrades.push(Click500);
            Upgrades.push(Click1000);
            Upgrades.push(Click2500);
            Upgrades.push(Click5000);
        }
    }

    function CheckActUps(Name, Amount) {
        var Ups = Upgrades;
        var U1 = Name+"1";
        var U2 = Name+"2";
        var U3 = Name+"3";
        var U4 = Name+"4";
        var U5 = Name+"5";
        for (var a=0; a<Ups.length; a++){
            if ((Ups[a][1]==U1||Ups[a][1]==U2||Ups[a][1]==U3||Ups[a][1]==U4||Ups[a][1]==U5) && Amount >= Ups[a][2]) {
                Upgrades[a][4] = 1;
                ActUps.push(Upgrades[a]);
                Upgrades.splice(a, 1);
            }
        }
        
        for (var b=9; b>=0; b--) {
            if (ActUps[b] == 0) {
                ActUps.splice(b, 1);
            }
        }

        ActUps = ActUps.sort(function(a, b) {
            if (a[3] == b[3]) {
              return a[2] - b[2];
            }
            return a[3] - b[3];
        });

        
        for (var c=0; ActUps.length<10; c++) {
            ActUps.push([0]);
        }

        for (var i=1; i<=10; i++) {
            if (ActUps[i-1][0] != 0) {
                $("#UpgradeImage" + i).attr("src", "/Images/Items/" + ActUps[i-1][0] + ".png");
                if (ActUps[i-1][1].slice(0, -1) == "Click") {
                    document.getElementById("UpsText" + i).innerHTML = "Price: " + NumConvert(ActUps[i-1][3], 2, 'f') + "<br>Adds "
                                                                       + (ActUps[i-1][5]*100).toFixed(1) + "% of the BTC p/s to the BTC per click."
                }
                else if (ActUps[i][3] < 1000) {
                    document.getElementById("UpsText" + i).innerHTML = "Price: " + ActUps[i-1][3] + "<br>" + "Multiplies the <br>"
                                                                       + ActUps[i-1][1].slice(0, -1) + " BTC per second by " + ActUps[i-1][5] + ".";
                }
                else {
                    document.getElementById("UpsText" + i).innerHTML = "Price: " + NumConvert(ActUps[i-1][3], 2, 'f') + "<br>" + "Multiplies the <br>"
                                                                       + ActUps[i-1][1].slice(0, -1) + " BTC per second by " + ActUps[i-1][5] + ".";
                }
            }
            else {
                $("#UpgradeImage" + i).attr("src", "/Images/Items/Lock.png");
                $("#UpgradeBox" + i).addClass("Uninteractable");
                document.getElementById("UpsText" + i).innerHTML = "This upgrade is currently locked. Continue playing to unlock upgrades.";
            }
        }
    }

    function CheckBuyUps() {
        for (var i=1; i<=10; i++) {
            if (i <= ActUps.length) {
                if (ActUps[i-1][0] != 0 && Bitcoins >= ActUps[i-1][3]) {
                    $("#UpgradeBox" + i).removeClass("Uninteractable");
                }
                else {
                    $("#UpgradeBox" + i).addClass("Uninteractable");
                }
            }
            else {
                $("#UpgradeBox" + i).addClass("Uninteractable");
            }
        }
    }

    $("#UpgradeBox1").on("click", function() {
        BuyUpgrade(0);
    });
    $("#UpgradeBox2").on("click", function() {
        BuyUpgrade(1);
    });
    $("#UpgradeBox3").on("click", function() {
        BuyUpgrade(2);
    });
    $("#UpgradeBox4").on("click", function() {
        BuyUpgrade(3);
    });
    $("#UpgradeBox5").on("click", function() {
        BuyUpgrade(4);
    });
    $("#UpgradeBox6").on("click", function() {
        BuyUpgrade(5);
    });
    $("#UpgradeBox7").on("click", function() {
        BuyUpgrade(6);
    });
    $("#UpgradeBox8").on("click", function() {
        BuyUpgrade(7);
    });
    $("#UpgradeBox9").on("click", function() {
        BuyUpgrade(8);
    });
    $("#UpgradeBox10").on("click", function() {
        BuyUpgrade(9);
    });

    function BuyUpgrade(number) {
        var i = number
        if (ActUps[i][0] != 0 && Bitcoins >= ActUps[i][3]) {
            Bitcoins -= ActUps[i][3];
            BTCSpentAll += ActUps[i][3];
            UpsSpent += ActUps[i][3];
            switch(ActUps[i][6]) {
                case "AbBPS":
                    AbacusBPS = AbacusBPS * ActUps[i][5];
                    break;
                case "GrBPS":
                    GrandpaBPS = GrandpaBPS * ActUps[i][5];
                    break;
                case "MiBPS":
                    MinRigBPS = MinRigBPS * ActUps[i][5];
                    break;
                case "HaBPS":
                    HackerBPS = HackerBPS * ActUps[i][5];
                    break;
                case "PrBPS":
                    PrivServBPS = PrivServBPS * ActUps[i][5];
                    break;
                case "ClBPS":
                    ClonMachBPS = ClonMachBPS * ActUps[i][5];
                    break;
                case "QuBPS":
                    QuanCompBPS = QuanCompBPS * ActUps[i][5];
                    break;
                case "GaBPS":
                    GalaxyBPS = GalaxyBPS * ActUps[i][5];
                    break;
                case "UnBPS":
                    UniverseBPS = UniverseBPS * ActUps[i][5];
                    break;
                case "MuBPS":
                    MultiverseBPS = MultiverseBPS * ActUps[i][5];
                    break;
                case "MuPC":
                    MultiplierPC = MultiplierPC + ActUps[i][5];
                    break;
            }
            ActUps.splice(i, 1);
            BoughtUpgrades += 1;
        }
    }

// Login system
    $("#LoginButton").click(function() {
        $("#LoginSystem").addClass("LoginActive");
    });

    $("#SettingsLoginButton").click(function() {
        $("#LoginSystem").addClass("LoginActive");
    });

    $(".Login").click(function() {
        window.location.href = "#login";
        SetLoginWindow()
    });

    $(".Signup").click(function() {
        window.location.href = "#signup";
        SetLoginWindow()
    });

    $(".LoginBack").click(function() {
        window.location.href = "#";
        SetLoginWindow()
    });

    $("#CloseLogin").click(function() {
        window.location.href = "#";
        SetLoginWindow()
    });

    $("#CloseSignup").click(function() {
        window.location.href = "#";
        SetLoginWindow()
    });

    $("#SettingsLogOutButton").click(function() {
        $("#LogoutSystem").addClass("LogoutActive");
    });

    $("#LogoutNo").click(function() {
        $("#LogoutSystem").removeClass("LogoutActive");
    });

    function SetLoginWindow() {
        var url = window.location.href;
        if (url.indexOf("#login") > -1) {
            $("#LoginSystem").addClass("LoginActive");
            $("#LoginMenu").removeClass("Inactive");
            $("#LogIn").removeClass("Inactive");
            $("#SignupMenu").addClass("Inactive");
            $("#SignUp").addClass("Inactive");
        }
        else if (url.indexOf("#signup") > -1) {
            $("#LoginSystem").addClass("LoginActive");
            $("#SignupMenu").removeClass("Inactive");
            $("#SignUp").removeClass("Inactive");
            $("#LoginMenu").addClass("Inactive");
            $("#LogIn").addClass("Inactive");
        }
        else {
            $("#LoginSystem").removeClass("LoginActive");
        }
        if (url.indexOf("invaliduid") > -1) {
            $("#invuid").removeClass("Inactive");
            removeError('signup');
        }
        if (url.indexOf("invalidemail") > -1) {
            $("#invemail").removeClass("Inactive");
            removeError('signup');
        }
        if (url.indexOf("diffpwds") > -1) {
            $("#diffpwds").removeClass("Inactive");
            removeError('signup');
        }
        if (url.indexOf("usernametaken") > -1) {
            $("#uidtaken").removeClass("Inactive");
            removeError('signup');
        }
        if (url.indexOf("stmtfailed") > -1) {
            $("#error").removeClass("Inactive");
            removeError('signup');
        }
        if (url.indexOf("signup_success") > -1) {
            $("#signupsuccess").removeClass("Inactive");
            removeError('login');
        }
        if (url.indexOf("invidem") > -1) {
            $("#wronguidemail").removeClass("Inactive");
            removeError('login');
        }
        if (url.indexOf("wrongpwd") > -1) {
            $("#wrongpwd").removeClass("Inactive");
            removeError('login');
        }
        if (url.indexOf("login_success") > -1) {
            $("#loginsuccess").removeClass("Inactive");
            removeError('#');
        }
        if (url.indexOf("wiped_progress") > -1) {
            $("#wipedProgress").removeClass("Inactive");
            removeError('#');
        }
    }

    function removeError(location) {
        setTimeout(function() {
            $("#invuid").addClass("Inactive");
            $("#invemail").addClass("Inactive");
            $("#diffpwds").addClass("Inactive");
            $("#uidtaken").addClass("Inactive");
            $("#error").addClass("Inactive");
            $("#signupsuccess").addClass("Inactive");
            $("#wronguidemail").addClass("Inactive");
            $("#wrongpwd").addClass("Inactive");
            $("#loginsuccess").addClass("Inactive");
            $("#wipedProgress").addClass("Inactive");
            switch (location) {
                case '#':
                    window.location.href = "/#";
                    break;
                case 'login':
                    window.location.href = "/#login";
                    break;
                case 'signup':
                    window.location.href = "/#signup";
                    break;
                default:
                    window.location.href = "/#";
                    break;
            }
        }, 4000);
    }

    //Stats
    function SetStats() {
        var CurrDate = new Date();
        if (Bitcoins >= BTCMaxAmt) {
            BTCMaxAmt = Bitcoins;
        }
        
        var Runtime = (CurrDate - window.LastDate);
        TimePlayed += Runtime;
        var PlayedDays = Math.floor(TimePlayed / 86400000);
        var PlayedHours = Math.floor((TimePlayed % 86400000) / 3600000);
        var PlayedMinutes = Math.floor(((TimePlayed % 86400000) % 3600000) / 60000);
        var PlayedSeconds = Math.floor((((TimePlayed % 86400000) % 3600000) % 60000) / 1000);
        if (PlayedDays < 10) {PlayedDays = "0" + PlayedDays}
        if (PlayedHours < 10) {PlayedHours = "0" + PlayedHours}
        if (PlayedMinutes < 10) {PlayedMinutes = "0" + PlayedMinutes}
        if (PlayedSeconds < 10) {PlayedSeconds = "0" + PlayedSeconds}
        window.LastDate = new Date();

        if (BTCGainAll < 1000) {
            document.querySelector("#AllBtc").innerHTML = "Total bitcoins gained: " + Math.floor(BTCGainAll);
        }
        else {
            document.querySelector("#AllBtc").innerHTML = "Total bitcoins gained: " + NumConvert(BTCGainAll, 2, 'f');
        }
        document.getElementById("SpentBtc").innerHTML = "Total bitcoins spent: " + NumConvert(BTCSpentAll, 2, 'f');
        if (BTCMaxAmt < 1000) {
            document.querySelector("#MaxBtc").innerHTML = "Highest bitcoin count: " + Math.floor(BTCMaxAmt);
        }
        else {
            document.getElementById("MaxBtc").innerHTML = "Highest bitcoin count: " + NumConvert(BTCMaxAmt, 2, 'f');
        }
        document.getElementById("GenSpent").innerHTML = "Total bitcoins spent on generators: " + NumConvert(GenSpent, 2, 'f');
        document.getElementById("GenAmt").innerHTML = "Total amount of generators: " + TotalGenerators;
        if (GenBTC < 1000 && BTCGainAll > 0) {
            document.getElementById("GenBtc").innerHTML = "Bitcoins gained from generators: " + Math.floor(GenBTC);
        }
        else {
            document.getElementById("GenBtc").innerHTML = "Bitcoins gained from generators: " + NumConvert(GenBTC, 2, 'f');
        }
        document.getElementById("Clicks").innerHTML = "Total clicks: " + Clicks;
        if (ClickBTC < 1000 && BTCGainAll > 0) {
            document.getElementById("ClickBtc").innerHTML = "Bitcoins gained from clicking: " + Math.floor(ClickBTC);    
        }
        else {
            document.getElementById("ClickBtc").innerHTML = "Bitcoins gained from clicking: " + NumConvert(ClickBTC, 2, 'f');
        }
        document.getElementById("UpsSpent").innerHTML = "Total bitcoins spent on upgrades: " + NumConvert(UpsSpent, 2, 'f');
        document.getElementById("BoughtUpgrades").innerHTML = "Upgrades bought: " + BoughtUpgrades + "/" + window.TotalUpgrades 
                                                               + " (" + ((BoughtUpgrades/window.TotalUpgrades)*100).toFixed(1) + "%)";
        document.getElementById("UnlockAchievements").innerHTML = "Achievements unlocked: " + UnlockedAchievements.length + "/" + Achievements.length 
                                                                  + " (" + ((UnlockedAchievements.length/Achievements.length)*100).toFixed(1) + "%)";
        document.getElementById("TimePlayed").innerHTML = "Time spent playing: " + PlayedDays + ":" + PlayedHours + ":" + 
                                                           PlayedMinutes + ":" + PlayedSeconds;
    }

    //Achievements
    function MakeAchievements() {
        //BTCGainAll
        Achievements.push(["BTCGainAll", 1, 0, "Gain 1 bitcoin", "TotalBTC1"]);
        Achievements.push(["BTCGainAll", 100, 0, "Gain 100 bitcoins", "TotalBTC2"]);
        Achievements.push(["BTCGainAll", 1E4, 0, "Gain 10 K bitcoins", "TotalBTC3"]);
        Achievements.push(["BTCGainAll", 1E6, 0, "Gain 1 M bitcoins", "TotalBTC4"]);
        Achievements.push(["BTCGainAll", 1E9, 0, "Gain 1 B bitcoins", "TotalBTC5"]);
        Achievements.push(["BTCGainAll", 1E12, 0, "Gain 1 T bitcoins", "TotalBTC6"]);
        Achievements.push(["BTCGainAll", 1E15, 0, "Gain 1 AA bitcoins", "TotalBTC7"]);
        //BTCSpentAll
        Achievements.push(["BTCSpentAll", 1, 0, "Spend 1 bitcoin", "SpendBTC1"]);
        Achievements.push(["BTCSpentAll", 100, 0, "Spend 100 bitcoins", "SpendBTC2"]);
        Achievements.push(["BTCSpentAll", 1E4, 0, "Spend 10 K bitcoins", "SpendBTC3"]);
        Achievements.push(["BTCSpentAll", 1E6, 0, "Spend 1 M bitcoins", "SpendBTC4"]);
        Achievements.push(["BTCSpentAll", 1E9, 0, "Spend 1 B bitcoins", "SpendBTC5"]);
        Achievements.push(["BTCSpentAll", 1E12, 0, "Spend 1 T bitcoins", "SpendBTC6"]);
        Achievements.push(["BTCSpentAll", 1E15, 0, "Spend 1 AA bitcoins", "SpendBTC7"]);
        // Clicks
        Achievements.push(["Clicks", 1, 0, "Click 1 time", "Clicks1"]);
        Achievements.push(["Clicks", 10, 0, "Click 10 times", "Clicks2"]);
        Achievements.push(["Clicks", 100, 0, "Click 100 times", "Clicks3"]);
        Achievements.push(["Clicks", 1E3, 0, "Click 1 K times", "Clicks4"]);
        Achievements.push(["Clicks", 1E4, 0, "Click 10 K times", "Clicks5"]);
        Achievements.push(["Clicks", 1E5, 0, "Click 100 K times", "Clicks6"]);
        Achievements.push(["Clicks", 1E6, 0, "Click 1 M times", "Clicks7"]);
        // ClickBTC
        Achievements.push(["ClickBTC", 1, 0, "Gain 1 bitcoin by clicking", "BTCFromClicks1"]);
        Achievements.push(["ClickBTC", 100, 0, "Gain 100 bitcoins by clicking", "BTCFromClicks2"]);
        Achievements.push(["ClickBTC", 1E3, 0, "Gain 1 K bitcoins by clicking", "BTCFromClicks3"]);
        Achievements.push(["ClickBTC", 1E4, 0, "Gain 10 K bitcoins by clicking", "BTCFromClicks4"]);
        Achievements.push(["ClickBTC", 1E6, 0, "Gain 1 M bitcoins by clicking", "BTCFromClicks5"]);
        Achievements.push(["ClickBTC", 1E9, 0, "Gain 1 B bitcoins by clicking", "BTCFromClicks6"]);
        Achievements.push(["ClickBTC", 1E12, 0, "Gain 1 T bitcoins by clicking", "BTCFromClicks7"]);
        // AbacusOwned
        Achievements.push(["AbacusOwned", 1, 0, "Own 1 abacus", "AbacusOwned1"]);
        Achievements.push(["AbacusOwned", 10, 0, "Own 10 abacuses", "AbacusOwned2"]);
        Achievements.push(["AbacusOwned", 25, 0, "Own 25 abacuses", "AbacusOwned3"]);
        Achievements.push(["AbacusOwned", 50, 0, "Own 50 abacuses", "AbacusOwned4"]);
        Achievements.push(["AbacusOwned", 100, 0, "Own 100 abacuses", "AbacusOwned5"]);
        Achievements.push(["AbacusOwned", 250, 0, "Own 250 abacuses", "AbacusOwned6"]);
        Achievements.push(["AbacusOwned", 500, 0, "Own 500 abacuses", "AbacusOwned7"]);
        // GrandpaOwned
        Achievements.push(["GrandpaOwned", 1, 0, "Own 1 grandpa", "GrandpaOwned1"]);
        Achievements.push(["GrandpaOwned", 10, 0, "Own 10 grandpas", "GrandpaOwned2"]);
        Achievements.push(["GrandpaOwned", 25, 0, "Own 25 grandpas", "GrandpaOwned3"]);
        Achievements.push(["GrandpaOwned", 50, 0, "Own 50 grandpas", "GrandpaOwned4"]);
        Achievements.push(["GrandpaOwned", 100, 0, "Own 100 grandpas", "GrandpaOwned5"]);
        Achievements.push(["GrandpaOwned", 250, 0, "Own 250 grandpas", "GrandpaOwned6"]);
        Achievements.push(["GrandpaOwned", 500, 0, "Own 500 grandpas", "GrandpaOwned7"]);
        // MiningRigOwned
        Achievements.push(["MiningRigOwned", 1, 0, "Own 1 mining rig", "MinRigOwned1"]);
        Achievements.push(["MiningRigOwned", 10, 0, "Own 10 mining rigs", "MinRigOwned2"]);
        Achievements.push(["MiningRigOwned", 25, 0, "Own 25 mining rigs", "MinRigOwned3"]);
        Achievements.push(["MiningRigOwned", 50, 0, "Own 50 mining rigs", "MinRigOwned4"]);
        Achievements.push(["MiningRigOwned", 100, 0, "Own 100 mining rigs", "MinRigOwned5"]);
        Achievements.push(["MiningRigOwned", 250, 0, "Own 250 mining rigs", "MinRigOwned6"]);
        Achievements.push(["MiningRigOwned", 500, 0, "Own 500 mining rigs", "MinRigOwned7"]);
        // HackerOwned
        Achievements.push(["HackerOwned", 1, 0, "Own 1 hacker", "HackerOwned1"]);
        Achievements.push(["HackerOwned", 10, 0, "Own 10 hackers", "HackerOwned2"]);
        Achievements.push(["HackerOwned", 25, 0, "Own 25 hackers", "HackerOwned3"]);
        Achievements.push(["HackerOwned", 50, 0, "Own 50 hackers", "HackerOwned4"]);
        Achievements.push(["HackerOwned", 100, 0, "Own 100 hackers", "HackerOwned5"]);
        Achievements.push(["HackerOwned", 250, 0, "Own 250 hackers", "HackerOwned6"]);
        Achievements.push(["HackerOwned", 500, 0, "Own 500 hackers", "HackerOwned7"]);
        // PrivateServerOwned
        Achievements.push(["PrivateServerOwned", 1, 0, "Own 1 private server", "PrivServOwned1"]);
        Achievements.push(["PrivateServerOwned", 10, 0, "Own 10 private servers", "PrivServOwned2"]);
        Achievements.push(["PrivateServerOwned", 25, 0, "Own 25 private servers", "PrivServOwned3"]);
        Achievements.push(["PrivateServerOwned", 50, 0, "Own 50 private servers", "PrivServOwned4"]);
        Achievements.push(["PrivateServerOwned", 100, 0, "Own 100 private servers", "PrivServOwned5"]);
        Achievements.push(["PrivateServerOwned", 250, 0, "Own 250 private servers", "PrivServOwned6"]);
        Achievements.push(["PrivateServerOwned", 500, 0, "Own 500 private servers", "PrivServOwned7"]);
        // CloningMachineOwned
        Achievements.push(["CloningMachineOwned", 1, 0, "Own 1 cloning machine", "ClonMachOwned1"]);
        Achievements.push(["CloningMachineOwned", 10, 0, "Own 10 cloning machines", "ClonMachOwned2"]);
        Achievements.push(["CloningMachineOwned", 25, 0, "Own 25 cloning machines", "ClonMachOwned3"]);
        Achievements.push(["CloningMachineOwned", 50, 0, "Own 50 cloning machines", "ClonMachOwned4"]);
        Achievements.push(["CloningMachineOwned", 100, 0, "Own 100 cloning machines", "ClonMachOwned5"]);
        Achievements.push(["CloningMachineOwned", 250, 0, "Own 250 cloning machines", "ClonMachOwned6"]);
        Achievements.push(["CloningMachineOwned", 500, 0, "Own 500 cloning machines", "ClonMachOwned7"]);
        // QuantumComputerOwned
        Achievements.push(["QuantumComputerOwned", 1, 0, "Own 1 quantum computer", "QuanCompOwned1"]);
        Achievements.push(["QuantumComputerOwned", 10, 0, "Own 10 quantum computers", "QuanCompOwned2"]);
        Achievements.push(["QuantumComputerOwned", 25, 0, "Own 25 quantum computers", "QuanCompOwned3"]);
        Achievements.push(["QuantumComputerOwned", 50, 0, "Own 50 quantum computers", "QuanCompOwned4"]);
        Achievements.push(["QuantumComputerOwned", 100, 0, "Own 100 quantum computers", "QuanCompOwned5"]);
        Achievements.push(["QuantumComputerOwned", 250, 0, "Own 250 quantum computers", "QuanCompOwned6"]);
        Achievements.push(["QuantumComputerOwned", 500, 0, "Own 500 quantum computers", "QuanCompOwned7"]);
        // GalaxyOwned
        Achievements.push(["GalaxyOwned", 1, 0, "Own 1 galaxy", "GalaxyOwned1"]);
        Achievements.push(["GalaxyOwned", 10, 0, "Own 10 galaxies", "GalaxyOwned2"]);
        Achievements.push(["GalaxyOwned", 25, 0, "Own 25 galaxies", "GalaxyOwned3"]);
        Achievements.push(["GalaxyOwned", 50, 0, "Own 50 galaxies", "GalaxyOwned4"]);
        Achievements.push(["GalaxyOwned", 100, 0, "Own 100 galaxies", "GalaxyOwned5"]);
        Achievements.push(["GalaxyOwned", 250, 0, "Own 250 galaxies", "GalaxyOwned6"]);
        Achievements.push(["GalaxyOwned", 500, 0, "Own 500 galaxies", "GalaxyOwned7"]);
        // UniverseOwned
        Achievements.push(["UniverseOwned", 1, 0, "Own 1 universe", "UniverseOwned1"]);
        Achievements.push(["UniverseOwned", 10, 0, "Own 10 universes", "UniverseOwned2"]);
        Achievements.push(["UniverseOwned", 25, 0, "Own 25 universes", "UniverseOwned3"]);
        Achievements.push(["UniverseOwned", 50, 0, "Own 50 universes", "UniverseOwned4"]);
        Achievements.push(["UniverseOwned", 100, 0, "Own 100 universes", "UniverseOwned5"]);
        Achievements.push(["UniverseOwned", 250, 0, "Own 250 universes", "UniverseOwned6"]);
        Achievements.push(["UniverseOwned", 500, 0, "Own 500 universes", "UniverseOwned7"]);
        // MultiverserOwned
        Achievements.push(["MultiverseOwned", 1, 0, "Own 1 multiverse", "MultiverseOwned1"]);
        Achievements.push(["MultiverseOwned", 10, 0, "Own 10 multiverses", "MultiverseOwned2"]);
        Achievements.push(["MultiverseOwned", 25, 0, "Own 25 multiverses", "MultiverseOwned3"]);
        Achievements.push(["MultiverseOwned", 50, 0, "Own 50 multiverses", "MultiverseOwned4"]);
        Achievements.push(["MultiverseOwned", 100, 0, "Own 100 multiverses", "MultiverseOwned5"]);
        Achievements.push(["MultiverseOwned", 250, 0, "Own 250 multiverses", "MultiverseOwned6"]);
        Achievements.push(["MultiverseOwned", 500, 0, "Own 500 multiverses", "MultiverseOwned7"]);
        // TotalGenerators
        Achievements.push(["TotalGenerators", 10, 0, "Own 10 generators", "GeneratorsOwned1"]);
        Achievements.push(["TotalGenerators", 100, 0, "Own 100 generators", "GeneratorsOwned2"]);
        Achievements.push(["TotalGenerators", 250, 0, "Own 250 generators", "GeneratorsOwned3"]);
        Achievements.push(["TotalGenerators", 500, 0, "Own 500 generators", "GeneratorsOwned4"]);
        Achievements.push(["TotalGenerators", 1E3, 0, "Own 1 K generators", "GeneratorsOwned5"]);
        Achievements.push(["TotalGenerators", 2500, 0, "Own 2.5 K generators", "GeneratorsOwned6"]);
        Achievements.push(["TotalGenerators", 5E3, 0, "Own 5 K generators", "GeneratorsOwned7"]);
        // GenBTC
        Achievements.push(["GenBTC", 1, 0, "Gain 1 bitcoin from generators", "BTCFromGenerators1"]);
        Achievements.push(["GenBTC", 100, 0, "Gain 100 bitcoins from generators", "BTCFromGenerators2"]);
        Achievements.push(["GenBTC", 1E3, 0, "Gain 1 K bitcoins from generators", "BTCFromGenerators3"]);
        Achievements.push(["GenBTC", 1E4, 0, "Gain 10 K bitcoins from generators", "BTCFromGenerators4"]);
        Achievements.push(["GenBTC", 1E6, 0, "Gain 1 M bitcoins from generators", "BTCFromGenerators5"]);
        Achievements.push(["GenBTC", 1E9, 0, "Gain 1 B bitcoins from generators", "BTCFromGenerators6"]);
        Achievements.push(["GenBTC", 1E12, 0, "Gain 1 T bitcoins from generators", "BTCFromGenerators7"]);
        // BoughtUpgrades
        Achievements.push(["BoughtUpgrades", 1, 0, "Buy 1 upgrade", "BuyUpgrades1"]);
        Achievements.push(["BoughtUpgrades", 5, 0, "Buy 5 upgrades", "BuyUpgrades2"]);
        Achievements.push(["BoughtUpgrades", 10, 0, "Buy 10 upgrades", "BuyUpgrades3"]);
        Achievements.push(["BoughtUpgrades", 20, 0, "Buy 20 upgrades", "BuyUpgrades4"]);
        Achievements.push(["BoughtUpgrades", 30, 0, "Buy 30 upgrades", "BuyUpgrades5"]);
        Achievements.push(["BoughtUpgrades", 40, 0, "Buy 40 upgrades", "BuyUpgrades6"]);
        Achievements.push(["BoughtUpgrades", 55, 0, "Buy 55 upgrades", "BuyUpgrades7"]);
        // TimePlayed
        Achievements.push(["TimePlayed", 6E4, 0, "Play for 1 minute", "PlayTime1"]);
        Achievements.push(["TimePlayed", 6E5, 0, "Play for 10 minutes", "PlayTime2"]);
        Achievements.push(["TimePlayed", 18E5, 0, "Play for 30 minutes", "PlayTime3"]);
        Achievements.push(["TimePlayed", 36E5, 0, "Play for 1 hour", "PlayTime4"]);
        Achievements.push(["TimePlayed", 18E6, 0, "Play for 5 hours", "PlayTime5"]);
        Achievements.push(["TimePlayed", 864E5, 0, "Play for 1 day", "PlayTime6"]);
        Achievements.push(["TimePlayed", 432E6, 0, "Play for 5 days", "PlayTime7"]);
    }

    function CheckAchievements() {
        for (var i = 0; i<=Achievements.length-1; i++) {
            if (Achievements[i][2] == 0) {
                switch (Achievements[i][0]) {
                    case "BTCGainAll":
                        if (BTCGainAll>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "BTCSpentAll":
                        if (BTCSpentAll>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "Clicks":
                        if (Clicks>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "ClickBTC":
                        if (ClickBTC>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "AbacusOwned":
                        if (AbacusOwned>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "GrandpaOwned":
                        if (GrandpaOwned>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "MiningRigOwned":
                        if (MiningRigOwned>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "HackerOwned":
                        if (HackerOwned>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "PrivateServerOwned":
                        if (PrivateServerOwned>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "CloningMachineOwned":
                        if (CloningMachineOwned>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "QuantumComputerOwned":
                        if (QuantumComputerOwned>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "GalaxyOwned":
                        if (GalaxyOwned>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "UniverseOwned":
                        if (UniverseOwned>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "MultiverseOwned":
                        if (MultiverseOwned>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "TotalGenerators":
                        if (TotalGenerators>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "GenBTC":
                        if (GenBTC>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "BoughtUpgrades":
                        if (BoughtUpgrades>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                    case "TimePlayed":
                        if (TimePlayed>=Achievements[i][1]) {
                            Achievements[i][2] = 1;
                            UnlockedAchievements.push(Achievements[i]);
                        }
                        break;
                }
            }
        }
    }

    function ActAchievements() {
        for (var i = 0; i<Achievements.length; i++) {
            var id = Achievements[i][4];
            if (Achievements[i][2] == 1) {
                switch (Achievements[i][0]) {
                    case "BTCGainAll":
                        $("#" + id + "Img").attr("src", "/Images/GainBTC.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "BTCSpentAll":
                        $("#" + id + "Img").attr("src", "/Images/SpendBTC.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "Clicks":
                        $("#" + id + "Img").attr("src", "/Images/Items/Click.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "ClickBTC":
                        $("#" + id + "Img").attr("src", "/Images/ClickBTC.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "AbacusOwned":
                        $("#" + id + "Img").attr("src", "/Images/Items/Item1.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "GrandpaOwned":
                        $("#" + id + "Img").attr("src", "/Images/Items/Item2.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "MiningRigOwned":
                        $("#" + id + "Img").attr("src", "/Images/Items/Item3.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "HackerOwned":
                        $("#" + id + "Img").attr("src", "/Images/Items/Item4.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "PrivateServerOwned":
                        $("#" + id + "Img").attr("src", "/Images/Items/Item5.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "CloningMachineOwned":
                        $("#" + id + "Img").attr("src", "/Images/Items/Item6.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "QuantumComputerOwned":
                        $("#" + id + "Img").attr("src", "/Images/Items/Item7.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "GalaxyOwned":
                        $("#" + id + "Img").attr("src", "/Images/Items/Item8.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "UniverseOwned":
                        $("#" + id + "Img").attr("src", "/Images/Items/Item9.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "MultiverseOwned":
                        $("#" + id + "Img").attr("src", "/Images/Items/Item10.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "TotalGenerators":
                        $("#" + id + "Img").attr("src", "/Images/Generator.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "GenBTC":
                        $("#" + id + "Img").attr("src", "/Images/GeneratorBTC.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "BoughtUpgrades":
                        $("#" + id + "Img").attr("src", "/Images/Upgrades.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                    case "TimePlayed":
                        $("#" + id + "Img").attr("src", "/Images/PlayTime.png");
                        $("#" + id).removeClass("Uninteractable");
                        Achievements[i][2] = 2;
                        break;
                }
            }
            else if (Achievements[i][2] == 0) {
                $("#" + id + "Img").attr("src", "/Images/Items/Lock.png");
                $("#" + id).addClass("Uninteractable");
            }
        }
    }

    function SetAchInfo() {
        for (var i = 0; i<Achievements.length; i++) {
            var id = Achievements[i][4];
            var number = id.slice(-1);
            if (number <=3) {
                $("#" + id + " > #InfoAchL").html(Achievements[i][3]);
            }
            else {
                $("#" + id + " > #InfoAchR").html(Achievements[i][3]);
            }
        }
    }

    // Settings
    var Autosave = true;
    var AutobuyGens = false;
    var AutobuyUps = false;
    var DisplayShadows = true;
    var IncreaseGrad = true;

    function SetSwitches() {
        document.getElementById("AutosaveCheck").checked = Autosave;
        document.getElementById("AutobuyGensCheck").checked = AutobuyGens;
        document.getElementById("AutobuyUpsCheck").checked = AutobuyUps;
        document.getElementById("ShadowsCheck").checked = DisplayShadows;
        document.getElementById("IncreaseGradCheck").checked = IncreaseGrad;
    }

    function SetSettingText() {
        if (document.getElementById("AutosaveCheck").checked == true) {
            Autosave = true;
            document.getElementById("Autosave").innerHTML = "Autosave every 30 seconds (on)";
        }
        else {
            Autosave = false;
            document.getElementById("Autosave").innerHTML = "Autosave every 30 seconds (off)";
        }
        if (document.getElementById("AutobuyGensCheck").checked == true) {
            AutobuyGens = true;
            document.getElementById("AutobuyGens").innerHTML = "Automatically buy generators (on)";
        }
        else {
            AutobuyGens = false;
            document.getElementById("AutobuyGens").innerHTML = "Automatically buy generators (off)";
        }
        if (document.getElementById("AutobuyUpsCheck").checked == true) {
            AutobuyUps = true;
            document.getElementById("AutobuyUps").innerHTML = "Automatically buy upgrades (on)";
        }
        else {
            AutobuyUps = false;
            document.getElementById("AutobuyUps").innerHTML = "Automatically buy upgrades (off)";
        }
        if (document.getElementById("ShadowsCheck").checked == true) {
            DisplayShadows = true;
            document.getElementById("Shadows").innerHTML = "Display shadows (on)";
            $("div").css("boxShadow", "");
        }
        else {
            DisplayShadows = false;
            document.getElementById("Shadows").innerHTML = "Display shadows (off)";
            $("div").css("boxShadow", "none");
        }
        if (document.getElementById("IncreaseGradCheck").checked == true) {
            IncreaseGrad = true;
            document.getElementById("IncreaseGrad").innerHTML = "Bitcoin amount increases gradually (on)";
        }
        else {
            IncreaseGrad = false;
            document.getElementById("IncreaseGrad").innerHTML = "Bitcoin amount increases gradually (off)";
        }
    }

    document.getElementById("AutosaveCheck").addEventListener("click", function() {
        SetSettingText()
        SaveSettings()
    });

    document.getElementById("AutobuyGensCheck").addEventListener("click", function() {
        SetSettingText()
        SaveSettings()
    });

    document.getElementById("AutobuyUpsCheck").addEventListener("click", function() {
        SetSettingText()
        SaveSettings()
    });

    document.getElementById("ShadowsCheck").addEventListener("click", function() {
        SetSettingText()
        SaveSettings()
    });

    document.getElementById("IncreaseGradCheck").addEventListener("click", function() {
        SetSettingText()
        SaveSettings()
    });

    function AutoBuyGenerators(BasePrice, AmtOwned, ItemNR) {
        if (AutobuyGens) {
            var AutoBuyPrice = Math.floor(Price(1, BasePrice, AmtOwned));
            if (Bitcoins >= AutoBuyPrice) {
                if (Bitcoins >= BTCMaxAmt) {
                    BTCMaxAmt = Bitcoins;
                }
                switch (ItemNR) {
                    case 1:
                        Buy1();
                        break;
                    case 2:
                        Buy2();
                        break;
                    case 3:
                        Buy3();
                        break;
                    case 4:
                        Buy4();
                        break;
                    case 5:
                        Buy5();
                        break;
                    case 6:
                        Buy6();
                        break;
                    case 7:
                        Buy7();
                        break;
                    case 8:
                        Buy8();
                        break;
                    case 9:
                        Buy9();
                        break;
                    case 10:
                        Buy10();
                        break;
                }
            }
        }
    }
    
    function AutoBuyUpgrades() {
        if (AutobuyUps) {
            if (Bitcoins >= ActUps[0][3]) {
                if (Bitcoins >= BTCMaxAmt) {
                    BTCMaxAmt = Bitcoins;
                }
                BuyUpgrade(0);
            }
        }
    }

    $('#TabsPosition').change(function() { ChangePartPosition('Tabs') });
    $('#BitcoinPosition').change(function() { ChangePartPosition('Bitcoin') });
    $('#ShopPosition').change(function() { ChangePartPosition('Shop') });

    var LastTabsPos = "left";
    var LastBitcoinPos = "middle";
    var LastShopPos = "right";

    function ChangePartPosition(changed) {
        var TabsPos = document.getElementById("TabsPosition").value;
        var BitcoinPos = document.getElementById("BitcoinPosition").value;
        var ShopPos = document.getElementById("ShopPosition").value;

        switch (changed) {
            case 'Tabs':
                if (TabsPos == LastBitcoinPos) {
                    BitcoinPos = LastTabsPos
                    $("#BitcoinPosition").val(LastTabsPos);
                }
                else {
                    ShopPos = LastTabsPos;
                    $("#ShopPosition").val(LastTabsPos);
                }
                break;
            case 'Bitcoin':
                if (BitcoinPos == LastTabsPos) {
                    TabsPos = LastBitcoinPos;
                    $("#TabsPosition").val(LastBitcoinPos);
                }
                else {
                    ShopPos = LastBitcoinPos;
                    $("#ShopPosition").val(LastBitcoinPos);
                }
                break;
            case 'Shop':
                if (ShopPos == LastBitcoinPos) {
                    BitcoinPos = LastShopPos;
                    $("#BitcoinPosition").val(LastShopPos);
                }
                else {
                    TabsPos = LastShopPos;
                    $("#TabsPosition").val(LastShopPos);
                }
                break;
            case 'onload':
                TabsPos = LastTabsPos;
                BitcoinPos = LastBitcoinPos;
                ShopPos = LastShopPos;
                $("#TabsPosition").val(LastTabsPos);
                $("#BitcoinPosition").val(LastBitcoinPos);
                $("#ShopPosition").val(LastShopPos);
        }

        $(".Box").removeClass("left middle right");
        $("#TabsSect").addClass(TabsPos);
        $("#BitcoinSect").addClass(BitcoinPos);
        $("#ShopSect").addClass(ShopPos)
        LastTabsPos = TabsPos;
        LastBitcoinPos = BitcoinPos;
        LastShopPos = ShopPos;

        if (TabsPos == "middle") {
            document.getElementById("TabsPosText").innerHTML = "Tabs part is positioned in the middle";
            document.getElementById("BitcoinPosText").innerHTML = "Bitcoin part is positioned on the " + BitcoinPos;
            document.getElementById("ShopPosText").innerHTML = "Shop part is positioned on the " + ShopPos;
        }
        else if (BitcoinPos == "middle") {
            document.getElementById("TabsPosText").innerHTML = "Tabs part is positioned on the " + TabsPos;
            document.getElementById("BitcoinPosText").innerHTML = "Bitcoin part is positioned in the middle";
            document.getElementById("ShopPosText").innerHTML = "Shop part is positioned on the " + ShopPos;
        }
        else {
            document.getElementById("TabsPosText").innerHTML = "Tabs part is positioned on the " + TabsPos;
            document.getElementById("BitcoinPosText").innerHTML = "Bitcoin part is positioned on the " + BitcoinPos;
            document.getElementById("ShopPosText").innerHTML = "Shop part is positioned in the middle";
        }

        if (ShopPos == "left") {
            for (var i=1; i<=5; i++) {
                $(".left" + i).addClass("right" + i).removeClass("left" + i);
            }
        }
        else {
            for (var i=1; i<=5; i++) {
                $(".right" + i).addClass("left" + i).removeClass("right" + i);
            }
        }
        SaveSettings()
    }

    // save progress
    var SavedData = false;
    var SavedSettings = false;

    document.getElementById("SaveButton").addEventListener("click", function() {
        SaveProgress()
    });

    document.getElementById("WipeButton").addEventListener("click", function() {
        $("#wipeConfirmMenu").addClass("WipeActive");
    });

    document.getElementById("WipeNo").addEventListener("click", function() {
        $("#wipeConfirmMenu").removeClass("WipeActive");
    });

    document.getElementById("WipeYes").addEventListener("click", function() {
        WipeProgress()
    });

    function AutoSave() {
        if (Autosave) {
            SaveProgress()
        }
    }

    function SaveProgress() {
        //settings
        SaveSettings()
        Cookies.set("BTC", Bitcoins, { expires: 3650, path: "/" });
        Cookies.set("MulPc", MultiplierPC, { expires: 3650, path: "/" });
        //stats
        Cookies.set("BtcGain", BTCGainAll, { expires: 3650, path: "/" });
        Cookies.set("BtcSpent", BTCSpentAll, { expires: 3650, path: "/" });
        Cookies.set("BtcMax", BTCMaxAmt, { expires: 3650, path: "/" });
        Cookies.set("GenSpent", GenSpent, { expires: 3650, path: "/" });
        Cookies.set("TotGens", TotalGenerators, { expires: 3650, path: "/" });
        Cookies.set("GenBtc", GenBTC, { expires: 3650, path: "/" });
        Cookies.set("Clicks", Clicks, { expires: 3650, path: "/" });
        Cookies.set("CliBtc", ClickBTC, { expires: 3650, path: "/" });
        Cookies.set("UpsSpent", UpsSpent, { expires: 3650, path: "/" });
        Cookies.set("BoughtUps", BoughtUpgrades, { expires: 3650, path: "/" });
        Cookies.set("AchsAmt", AchievementsAmount, { expires: 3650, path: "/" });
        Cookies.set("TimePlay", TimePlayed, { expires: 3650, path: "/" });
        //shop
        Cookies.set("AbaOwn", AbacusOwned, { expires: 3650, path: "/" });
        Cookies.set("GraOwn", GrandpaOwned, { expires: 3650, path: "/" });
        Cookies.set("MinOwn", MiningRigOwned, { expires: 3650, path: "/" });
        Cookies.set("HacOwn", HackerOwned, { expires: 3650, path: "/" });
        Cookies.set("PriOwn", PrivateServerOwned, { expires: 3650, path: "/" });
        Cookies.set("CloOwn", CloningMachineOwned, { expires: 3650, path: "/" });
        Cookies.set("QuaOwn", QuantumComputerOwned, { expires: 3650, path: "/" });
        Cookies.set("GalOwn", GalaxyOwned, { expires: 3650, path: "/" });
        Cookies.set("UniOwn", UniverseOwned, { expires: 3650, path: "/" });
        Cookies.set("MulOwn", MultiverseOwned, { expires: 3650, path: "/" });
        Cookies.set("AbaBps", AbacusBPS, { expires: 3650, path: "/" });
        Cookies.set("GraBps", GrandpaBPS, { expires: 3650, path: "/" });
        Cookies.set("MinBps", MinRigBPS, { expires: 3650, path: "/" });
        Cookies.set("HacBps", HackerBPS, { expires: 3650, path: "/" });
        Cookies.set("PriBps", PrivServBPS, { expires: 3650, path: "/" });
        Cookies.set("CloBps", ClonMachBPS, { expires: 3650, path: "/" });
        Cookies.set("QuaBps", QuanCompBPS, { expires: 3650, path: "/" });
        Cookies.set("GalBps", GalaxyBPS, { expires: 3650, path: "/" });
        Cookies.set("UniBps", UniverseBPS, { expires: 3650, path: "/" });
        Cookies.set("MulBps", MultiverseBPS, { expires: 3650, path: "/" });
        //arrays
        var UpgradesCookie = JSON.stringify(Upgrades);
        Cookies.set("Ups", UpgradesCookie, { expires: 3650, path: "/" });
        var ActUpsCookie = JSON.stringify(ActUps);
        Cookies.set("ActUps", ActUpsCookie, { expires: 3650, path: "/" });
        SavedData = true;
        Cookies.set("SavData", SavedData, { expires: 3650, path: "/" });
    }

    function SetProgress() {
        SavedData = Cookies.get("SavData");
        SavedSettings = Cookies.get("SaveSets");
        if (SavedSettings) {
            if (Cookies.get("Autosave") == 'true') {Autosave = true} else {Autosave = false};
            if (Cookies.get("AutobuyGens") == 'true') {AutobuyGens = true} else {AutobuyGens = false};
            if (Cookies.get("AutobuyUps") == 'true') {AutobuyUps = true} else {AutobuyUps = false};
            if (Cookies.get("DispShad") == 'true') {DisplayShadows = true} else {DisplayShadows = false};
            if (Cookies.get("IncGrad") == 'true') {IncreaseGrad = true} else {IncreaseGrad = false};
            LastTabsPos = Cookies.get("TabPos");
            LastBitcoinPos = Cookies.get("BtcPos");
            LastShopPos = Cookies.get("ShopPos");
            SetSwitches()
            SetSettingText()
            ChangePartPosition('onload')
        }
        if (SavedData) {
                Bitcoins = parseFloat(Cookies.get("BTC"));
                MultiplierPC = parseFloat(Cookies.get("MulPc"));
                //stats
                BTCGainAll = parseFloat(Cookies.get("BtcGain"));
                BTCSpentAll = parseInt(Cookies.get("BtcSpent"));
                BTCMaxAmt = parseFloat(Cookies.get("BtcMax"));
                GenSpent = parseInt(Cookies.get("GenSpent"));
                TotalGenerators = parseInt(Cookies.get("TotGens"));
                GenBTC = parseFloat(Cookies.get("GenBtc"));
                Clicks = parseInt(Cookies.get("Clicks"));
                ClickBTC = parseFloat(Cookies.get("CliBtc"));
                UpsSpent = parseInt(Cookies.get("UpsSpent"));
                BoughtUpgrades = parseInt(Cookies.get("BoughtUps"));
                AchievementsAmount = parseInt(Cookies.get("AchsAmt"));
                TimePlayed = parseInt(Cookies.get("TimePlay"));
                //shop
                AbacusOwned = parseInt(Cookies.get("AbaOwn"));
                GrandpaOwned = parseInt(Cookies.get("GraOwn"));
                MiningRigOwned = parseInt(Cookies.get("MinOwn"));
                HackerOwned = parseInt(Cookies.get("HacOwn"));
                PrivateServerOwned = parseInt(Cookies.get("PriOwn"));
                CloningMachineOwned = parseInt(Cookies.get("CloOwn"));
                QuantumComputerOwned = parseInt(Cookies.get("QuaOwn"));
                GalaxyOwned = parseInt(Cookies.get("GalOwn"));
                UniverseOwned = parseInt(Cookies.get("UniOwn"));
                MultiverseOwned = parseInt(Cookies.get("MulOwn"));
                AmtOwnedText()
                AbacusBPS = parseFloat(Cookies.get("AbaBps"));
                GrandpaBPS = parseInt(Cookies.get("GraBps"));
                MinRigBPS = parseInt(Cookies.get("MinBps"));
                HackerBPS = parseInt(Cookies.get("HacBps"));
                PrivServBPS = parseInt(Cookies.get("PriBps"));
                ClonMachBPS = parseInt(Cookies.get("CloBps"));
                QuanCompBPS = parseInt(Cookies.get("QuaBps"));
                GalaxyBPS = parseInt(Cookies.get("GalBps"));
                UniverseBPS = parseInt(Cookies.get("UniBps"));
                MultiverseBPS = parseInt(Cookies.get("MulBps"));
                //arrays
                if (Cookies.get("Ups") != null) {
                    var UpgradesCookie = Cookies.get("Ups");
                    Upgrades = JSON.parse(UpgradesCookie);
                    UpgradesSet = true;   
                }
                var ActUpsCookie = Cookies.get("ActUps");
                ActUps = JSON.parse(ActUpsCookie);
        }
    }

    function WipeProgress() {
        Cookies.remove("BTC", { path: "/" });
        Cookies.remove("MulPc", { path: "/" });
        //stats
        Cookies.remove("SavData", { path: "/" });
        Cookies.remove("BtcGain", { path: "/" });
        Cookies.remove("BtcSpent", { path: "/" });
        Cookies.remove("BtcMax", { path: "/" });
        Cookies.remove("GenSpent", { path: "/" });
        Cookies.remove("TotGens", { path: "/" });
        Cookies.remove("GenBtc", { path: "/" });
        Cookies.remove("Clicks", { path: "/" });
        Cookies.remove("CliBtc", { path: "/" });
        Cookies.remove("UpsSpent", { path: "/" });
        Cookies.remove("BoughtUps", { path: "/" });
        Cookies.remove("AchsAmt", { path: "/" });
        Cookies.remove("TimePlay", { path: "/" });
        //shop
        Cookies.remove("AbaOwn", { path: "/" });
        Cookies.remove("GraOwn", { path: "/" });
        Cookies.remove("MinOwn", { path: "/" });
        Cookies.remove("HacOwn", { path: "/" });
        Cookies.remove("PriOwn", { path: "/" });
        Cookies.remove("CloOwn", { path: "/" });
        Cookies.remove("QuaOwn", { path: "/" });
        Cookies.remove("GalOwn", { path: "/" });
        Cookies.remove("UniOwn", { path: "/" });
        Cookies.remove("MulOwn", { path: "/" });
        Cookies.remove("AbaBps", { path: "/" });
        Cookies.remove("GraBps", { path: "/" });
        Cookies.remove("MinBps", { path: "/" });
        Cookies.remove("HacBps", { path: "/" });
        Cookies.remove("PriBps", { path: "/" });
        Cookies.remove("CloBps", { path: "/" });
        Cookies.remove("QuaBps", { path: "/" });
        Cookies.remove("GalBps", { path: "/" });
        Cookies.remove("UniBps", { path: "/" });
        Cookies.remove("MulBps", { path: "/" });
        //arrays
        Cookies.remove("Ups", { path: "/" });
        Cookies.remove("ActUps", { path: "/" });
        window.location.href = 'http://ln05012803.haperen.eu/#/?wiped_progress';
        window.location.reload();
    }

    function SaveSettings() {
        Cookies.set("Autosave", Autosave, { expires: 3650, path: "/" });
        Cookies.set("AutobuyGens", AutobuyGens, { expires: 3650, path: "/" });
        Cookies.set("AutobuyUps", AutobuyUps, { expires: 3650, path: "/" });
        Cookies.set("DispShad", DisplayShadows, { expires: 3650, path: "/" });
        Cookies.set("IncGrad", IncreaseGrad, { expires: 3650, path: "/" });
        Cookies.set("TabPos", LastTabsPos, { expires: 3650, path: "/" });
        Cookies.set("BtcPos", LastBitcoinPos, { expires: 3650, path: "/" });
        Cookies.set("ShopPos", LastShopPos, { expires: 3650, path: "/" });
        SavedSettings = true;
        Cookies.set("SaveSets", SavedSettings, { expires: 3650, path: "/" });
    }

    //intervals
    window.onload = () => {
        SetProgress()
        SetLoginWindow();
        var TitleInterval = setInterval(UpdateTitle, 1500);
        var CountsInterval = setInterval(UpdateCounts, 50);
        var BTCpsGradInterval = setInterval(BTCpsGrad, 50);
        var BTCpsInterval = setInterval(BTCps, 1000);
        UpgradeStats();
        var CheckBuyUpgrades = setInterval(CheckBuyUps, 50);
        var ItemsInterval = setInterval(ItemStats, 50);
        window.TotalUpgrades = 55;
        window.LastDate = new Date();
        var StatsInterval = setInterval(SetStats, 50);
        MakeAchievements();
        var CheckAch = setInterval(CheckAchievements, 50);
        var ActAch = setInterval(ActAchievements, 50);
        var AutobuyUps = setInterval(AutoBuyUpgrades, 50);
        var Save = setInterval(AutoSave, 30000);
        SetAchInfo()
    }

    document.getElementById("MainBitcoin").addEventListener("click", function() {
        ClickBitcoin()
    });
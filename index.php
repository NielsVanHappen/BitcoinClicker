<?php
  session_start();
?>

<!DOCTYPE html>
<html lang="EN-en"><head>
  <meta name="google-site-verification" content="qnA-oLDRo_zmWCpZIG2E9GgxycE8InI9dRdbhGp93NY" />
  <meta charset="utf-8">
  <title>Bitcoin Clicker</title>
  <meta name="description" content="Click the Bitcoin to gain Bitcoins. Use these Bitcoins to buy generators which gain you more Bitcoins!">
  <link rel="stylesheet" href="Design.css">
  <link rel="icon" href="/Images/MainBitcoin.png">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
  <script language="JavaScript" type="module" src="/Functions.js"></script>
</head>
<body>
  
  <!--Tabs-->
  <div id="TabsSect" class="left y Box">
    <div class="TabsMenu">
      <button id="SettingsButton" class="l y TabsButton"><p class="TabsButtonText">Settings</p></button>
      <div class="l br Seperator2"></div>
      <button id="StatsButton" class="l br TabsButton"><p class="TabsButtonText">Stats</p></button>
      <div class="l br Seperator2"></div>
      <button id="AchievementsButton" class="l y TabsButton"><p class="TabsButtonText">Achievements</p></button>
    </div>

    <div class="Tabs">
        <div id="SettingsTab" class="Tab Inactive">
          <div class="Setting" style="margin-top: 2vh;">
            <?php
            if (isset($_SESSION["useruid"])) {
              echo "<div id='SettingsLogOutButton' class='r br SettingsButton'>Log out</div>
                    <div class='SettingText'>Click to log out of your account</div>";
            }
            else {
              echo "<div id='SettingsLoginButton' class='r br SettingsButton'>Log in</div>
                    <div class='SettingText'>Click to log into your account</div>";
            }
            ?>
          </div>

          <div class="Setting">
            <?php
            if (isset($_SESSION["useruid"])) {
              // can't save to account yet, therefore save to computer.
              echo "<div id='SaveButton' class='r br SettingsButton'>Save</div>";
              echo "<div class='SettingText'>Click to save your progress</div>";
            }
            else {
              echo "<div id='SaveButton' class='r br SettingsButton'>Save</div>";
              echo "<div class='SettingText'>Click to save your progress</div>";
            }
            ?>
          </div>

          <div class="Setting">
            <?php
              if (isset($_SESSION["useruid"])) {
                // can't save to account yet, therefore save to computer.
                echo "<div id='WipeButton' class='r br SettingsButton'>Wipe</div>";
                echo "<div class='SettingText'>Click to wipe your progress</div>";
              }
              else {
                echo "<div id='WipeButton' class='r br SettingsButton'>Wipe</div>";
                echo "<div class='SettingText'>Click to wipe your progress</div>";
              }
            ?>
          </div>

          <div class="Setting">
            <label class="SettingSwitch">
              <input id="AutosaveCheck" type="checkbox" checked>
              <span class="SettingSlider"></span>
            </label>
            <div id="Autosave" class='SettingText'>Autosave every 30 seconds (on)</div>
          </div>

          <div class="Setting">
            <label class="SettingSwitch">
              <input id="AutobuyGensCheck" type="checkbox">
              <span class="SettingSlider"></span>
            </label>
            <div id="AutobuyGens" class='SettingText'>Automatically buy generators (off)</div>
          </div>

          <div class="Setting">
            <label class="SettingSwitch">
              <input id="AutobuyUpsCheck" type="checkbox">
              <span class="SettingSlider"></span>
            </label>
            <div id="AutobuyUps" class='SettingText'>Automatically buy upgrades (off)</div>
          </div>

          <div class="Setting">
            <label class="SettingSwitch">
              <input id="ShadowsCheck" type="checkbox" checked>
              <span class="SettingSlider"></span>
            </label>
            <div id="Shadows" class='SettingText'>Display shadows (on)</div>
          </div>

          <div class="Setting">
            <label class="SettingSwitch">
              <input id="IncreaseGradCheck" type="checkbox" checked>
              <span class="SettingSlider"></span>
            </label>
            <div id="IncreaseGrad" class='SettingText'>Bitcoin amount increases gradually (on)</div>
          </div>

          <div class="Setting">
            <select id="TabsPosition" class="y SelectDrop">
              <option value="left" selected>Left</option>
              <option value="middle">Middle</option>
              <option value="right">Right</option>
            </select>
            <div id="TabsPosText" class="SettingText">Tabs part is positioned on the left</div>
          </div>

          <div class="Setting">
            <select id="BitcoinPosition" class="y SelectDrop">
              <option value="left">Left</option>
              <option value="middle" selected>Middle</option>
              <option value="right">Right</option>
            </select>
            <div id="BitcoinPosText" class="SettingText">Bitcoin part is positioned in the middle</div>
          </div>

          <div class="Setting">
            <select id="ShopPosition" class="y SelectDrop">
              <option value="left">Left</option>
              <option value="middle">Middle</option>
              <option value="right" selected>Right</option>
            </select>
            <div id="ShopPosText" class="SettingText">Shop part is positioned on the right</div>
          </div>
        </div>

        <div id="StatsTab" class="Tab">
            <div id="AllBtc" class="StatText">Total bitcoins gained: 0</div>
            <div id="SpentBtc" class="StatText">Total bitcoins spent: 0</div>
            <div id="MaxBtc" class="StatText">Highest bitcoin count: 0</div>
            <div id="GenSpent" class="StatText">Total bitcoins spent on generators: 0</div>
            <div id="GenAmt" class="StatText">Total amount of generators: 0</div>
            <div id="GenBtc" class="StatText">Bitcoins gained from generators: 0</div>
            <div id="Clicks" class="StatText">Total clicks: 0</div>
            <div id="ClickBtc" class="StatText">Bitcoins gained from clicking: 0</div>
            <div id="UpsSpent" class="StatText">Total bitcoins spent on upgrades: 0</div>
            <div id="BoughtUpgrades" class="StatText">Upgrades bought: 0/55 (0%)</div>
            <div id="UnlockAchievements" class="StatText">Achievements unlocked: 0/126 (0%)</div>
            <div id="TimePlayed" class="StatText">Time spent playing: 00:00:00:00</div>
        </div>

        <div id="AchievementsTab" class="Tab Inactive">
            <div class="AchievementsContainer">
                <div class="TotalBTC">
                    <div id="TotalBTCImg" class="AchievementsImg tb"><img class="AchievementImg" src="/Images/GainBTC.png"><div id="InfoAchL">Gain bitcoins</div></div>
                    <div id="TotalBTC1" class="AchievementsItem tb lb"><img id="TotalBTC1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="TotalBTC2" class="AchievementsItem tb"><img id="TotalBTC2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="TotalBTC3" class="AchievementsItem tb"><img id="TotalBTC3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="TotalBTC4" class="AchievementsItem tb"><img id="TotalBTC4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="TotalBTC5" class="AchievementsItem tb"><img id="TotalBTC5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="TotalBTC6" class="AchievementsItem tb"><img id="TotalBTC6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="TotalBTC7" class="AchievementsItem tb rb"><img id="TotalBTC7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="SpendBTC">
                    <div id="SpendBTCImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/SpendBTC.png"><div id="InfoAchL">Spend bitcoins</div></div>
                    <div id="SpendBTC1" class="AchievementsItem lb"><img id="SpendBTC1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="SpendBTC2" class="AchievementsItem"><img id="SpendBTC2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="SpendBTC3" class="AchievementsItem"><img id="SpendBTC3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="SpendBTC4" class="AchievementsItem"><img id="SpendBTC4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="SpendBTC5" class="AchievementsItem"><img id="SpendBTC5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="SpendBTC6" class="AchievementsItem"><img id="SpendBTC6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="SpendBTC7" class="AchievementsItem rb"><img id="SpendBTC7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="Clicks">
                    <div id="ClicksImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Items/Click.png"><div id="InfoAchL">Click the bitcoin</div></div>
                    <div id="Clicks1" class="AchievementsItem lb"><img id="Clicks1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="Clicks2" class="AchievementsItem"><img id="Clicks2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="Clicks3" class="AchievementsItem"><img id="Clicks3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="Clicks4" class="AchievementsItem"><img id="Clicks4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="Clicks5" class="AchievementsItem"><img id="Clicks5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="Clicks6" class="AchievementsItem"><img id="Clicks6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="Clicks7" class="AchievementsItem rb"><img id="Clicks7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="BTCFromClicks">
                    <div id="BTCFromClicksImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/ClickBTC.png"><div id="InfoAchL">Gain bitcoins from clicks</div></div>
                    <div id="BTCFromClicks1" class="AchievementsItem lb"><img id="BTCFromClicks1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="BTCFromClicks2" class="AchievementsItem"><img id="BTCFromClicks2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="BTCFromClicks3" class="AchievementsItem"><img id="BTCFromClicks3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="BTCFromClicks4" class="AchievementsItem"><img id="BTCFromClicks4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="BTCFromClicks5" class="AchievementsItem"><img id="BTCFromClicks5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="BTCFromClicks6" class="AchievementsItem"><img id="BTCFromClicks6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="BTCFromClicks7" class="AchievementsItem rb"><img id="BTCFromClicks7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="AbacusOwned">
                    <div id="AbacusOwnedImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Items/Item1.png"><div id="InfoAchL">Own abacuses</div></div>
                    <div id="AbacusOwned1" class="AchievementsItem lb"><img id="AbacusOwned1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="AbacusOwned2" class="AchievementsItem"><img id="AbacusOwned2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="AbacusOwned3" class="AchievementsItem"><img id="AbacusOwned3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="AbacusOwned4" class="AchievementsItem"><img id="AbacusOwned4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="AbacusOwned5" class="AchievementsItem"><img id="AbacusOwned5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="AbacusOwned6" class="AchievementsItem"><img id="AbacusOwned6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="AbacusOwned7" class="AchievementsItem rb"><img id="AbacusOwned7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="GrandpaOwned">
                    <div id="GrandpaOwnedImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Items/Item2.png"><div id="InfoAchL">Own grandpas</div></div>
                    <div id="GrandpaOwned1" class="AchievementsItem lb"><img id="GrandpaOwned1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="GrandpaOwned2" class="AchievementsItem"><img id="GrandpaOwned2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="GrandpaOwned3" class="AchievementsItem"><img id="GrandpaOwned3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="GrandpaOwned4" class="AchievementsItem"><img id="GrandpaOwned4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="GrandpaOwned5" class="AchievementsItem"><img id="GrandpaOwned5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="GrandpaOwned6" class="AchievementsItem"><img id="GrandpaOwned6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="GrandpaOwned7" class="AchievementsItem rb"><img id="GrandpaOwned7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="MinRigOwned">
                    <div id="MinRigOwnedImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Items/Item3.png"><div id="InfoAchL">Own mining rigs</div></div>
                    <div id="MinRigOwned1" class="AchievementsItem lb"><img id="MinRigOwned1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="MinRigOwned2" class="AchievementsItem"><img id="MinRigOwned2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="MinRigOwned3" class="AchievementsItem"><img id="MinRigOwned3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="MinRigOwned4" class="AchievementsItem"><img id="MinRigOwned4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="MinRigOwned5" class="AchievementsItem"><img id="MinRigOwned5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="MinRigOwned6" class="AchievementsItem"><img id="MinRigOwned6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="MinRigOwned7" class="AchievementsItem rb"><img id="MinRigOwned7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="HackerOwned">
                    <div id="HackerOwnedImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Items/Item4.png"><div id="InfoAchL">Own hackers</div></div>
                    <div id="HackerOwned1" class="AchievementsItem lb"><img id="HackerOwned1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="HackerOwned2" class="AchievementsItem"><img id="HackerOwned2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="HackerOwned3" class="AchievementsItem"><img id="HackerOwned3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="HackerOwned4" class="AchievementsItem"><img id="HackerOwned4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="HackerOwned5" class="AchievementsItem"><img id="HackerOwned5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="HackerOwned6" class="AchievementsItem"><img id="HackerOwned6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="HackerOwned7" class="AchievementsItem rb"><img id="HackerOwned7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="PrivServOwned">
                    <div id="PrivServOwnedImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Items/Item5.png"><div id="InfoAchL">Own private servers</div></div>
                    <div id="PrivServOwned1" class="AchievementsItem lb"><img id="PrivServOwned1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="PrivServOwned2" class="AchievementsItem"><img id="PrivServOwned2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="PrivServOwned3" class="AchievementsItem"><img id="PrivServOwned3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="PrivServOwned4" class="AchievementsItem"><img id="PrivServOwned4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="PrivServOwned5" class="AchievementsItem"><img id="PrivServOwned5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="PrivServOwned6" class="AchievementsItem"><img id="PrivServOwned6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="PrivServOwned7" class="AchievementsItem rb"><img id="PrivServOwned7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="ClonMachOwned">
                    <div id="ClonMachOwnedImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Items/Item6.png"><div id="InfoAchL">Own cloning machines</div></div>
                    <div id="ClonMachOwned1" class="AchievementsItem lb"><img id="ClonMachOwned1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="ClonMachOwned2" class="AchievementsItem"><img id="ClonMachOwned2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="ClonMachOwned3" class="AchievementsItem"><img id="ClonMachOwned3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="ClonMachOwned4" class="AchievementsItem"><img id="ClonMachOwned4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="ClonMachOwned5" class="AchievementsItem"><img id="ClonMachOwned5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="ClonMachOwned6" class="AchievementsItem"><img id="ClonMachOwned6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="ClonMachOwned7" class="AchievementsItem rb"><img id="ClonMachOwned7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="QuanCompOwned">
                    <div id="QuanCompOwnedImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Items/Item7.png"><div id="InfoAchL">Own quantum computers</div></div>
                    <div id="QuanCompOwned1" class="AchievementsItem lb"><img id="QuanCompOwned1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="QuanCompOwned2" class="AchievementsItem"><img id="QuanCompOwned2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="QuanCompOwned3" class="AchievementsItem"><img id="QuanCompOwned3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="QuanCompOwned4" class="AchievementsItem"><img id="QuanCompOwned4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="QuanCompOwned5" class="AchievementsItem"><img id="QuanCompOwned5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="QuanCompOwned6" class="AchievementsItem"><img id="QuanCompOwned6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="QuanCompOwned7" class="AchievementsItem rb"><img id="QuanCompOwned7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="GalaxyOwned">
                    <div id="GalaxyOwnedImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Items/Item8.png"><div id="InfoAchL">Own galaxies</div></div>
                    <div id="GalaxyOwned1" class="AchievementsItem lb"><img id="GalaxyOwned1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="GalaxyOwned2" class="AchievementsItem"><img id="GalaxyOwned2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="GalaxyOwned3" class="AchievementsItem"><img id="GalaxyOwned3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="GalaxyOwned4" class="AchievementsItem"><img id="GalaxyOwned4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="GalaxyOwned5" class="AchievementsItem"><img id="GalaxyOwned5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="GalaxyOwned6" class="AchievementsItem"><img id="GalaxyOwned6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="GalaxyOwned7" class="AchievementsItem rb"><img id="GalaxyOwned7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="UniverseOwned">
                    <div id="UniverseOwnedImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Items/Item9.png"><div id="InfoAchL">Own universes</div></div>
                    <div id="UniverseOwned1" class="AchievementsItem lb"><img id="UniverseOwned1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="UniverseOwned2" class="AchievementsItem"><img id="UniverseOwned2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="UniverseOwned3" class="AchievementsItem"><img id="UniverseOwned3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="UniverseOwned4" class="AchievementsItem"><img id="UniverseOwned4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="UniverseOwned5" class="AchievementsItem"><img id="UniverseOwned5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="UniverseOwned6" class="AchievementsItem"><img id="UniverseOwned6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="UniverseOwned7" class="AchievementsItem rb"><img id="UniverseOwned7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="MultiverseOwned">
                    <div id="MultiverseOwnedImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Items/Item10.png"><div id="InfoAchL">Own multiverses</div></div>
                    <div id="MultiverseOwned1" class="AchievementsItem lb"><img id="MultiverseOwned1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="MultiverseOwned2" class="AchievementsItem"><img id="MultiverseOwned2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="MultiverseOwned3" class="AchievementsItem"><img id="MultiverseOwned3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="MultiverseOwned4" class="AchievementsItem"><img id="MultiverseOwned4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="MultiverseOwned5" class="AchievementsItem"><img id="MultiverseOwned5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="MultiverseOwned6" class="AchievementsItem"><img id="MultiverseOwned6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="MultiverseOwned7" class="AchievementsItem rb"><img id="MultiverseOwned7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="GeneratorsOwned">
                    <div id="GeneratorsOwnedImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Generator.png"><div id="InfoAchL">Own generators</div></div>
                    <div id="GeneratorsOwned1" class="AchievementsItem lb"><img id="GeneratorsOwned1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="GeneratorsOwned2" class="AchievementsItem"><img id="GeneratorsOwned2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="GeneratorsOwned3" class="AchievementsItem"><img id="GeneratorsOwned3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="GeneratorsOwned4" class="AchievementsItem"><img id="GeneratorsOwned4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="GeneratorsOwned5" class="AchievementsItem"><img id="GeneratorsOwned5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="GeneratorsOwned6" class="AchievementsItem"><img id="GeneratorsOwned6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="GeneratorsOwned7" class="AchievementsItem rb"><img id="GeneratorsOwned7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="BTCFromGenerators">
                    <div id="BTCFromGeneratorsImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/GeneratorBTC.png"><div id="InfoAchL">Gain bitcoins from generators</div></div>
                    <div id="BTCFromGenerators1" class="AchievementsItem lb"><img id="BTCFromGenerators1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="BTCFromGenerators2" class="AchievementsItem"><img id="BTCFromGenerators2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="BTCFromGenerators3" class="AchievementsItem"><img id="BTCFromGenerators3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="BTCFromGenerators4" class="AchievementsItem"><img id="BTCFromGenerators4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="BTCFromGenerators5" class="AchievementsItem"><img id="BTCFromGenerators5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="BTCFromGenerators6" class="AchievementsItem"><img id="BTCFromGenerators6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="BTCFromGenerators7" class="AchievementsItem rb"><img id="BTCFromGenerators7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="BuyUpgrades">
                    <div id="BuyUpgradesImg" class="AchievementsImg"><img class="AchievementImg" src="/Images/Upgrades.png"><div id="InfoAchL">Buy upgrades</div></div>
                    <div id="BuyUpgrades1" class="AchievementsItem lb"><img id="BuyUpgrades1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="BuyUpgrades2" class="AchievementsItem"><img id="BuyUpgrades2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="BuyUpgrades3" class="AchievementsItem"><img id="BuyUpgrades3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="BuyUpgrades4" class="AchievementsItem"><img id="BuyUpgrades4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="BuyUpgrades5" class="AchievementsItem"><img id="BuyUpgrades5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="BuyUpgrades6" class="AchievementsItem"><img id="BuyUpgrades6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="BuyUpgrades7" class="AchievementsItem rb"><img id="BuyUpgrades7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
                <div class="PlayTime">
                    <div id="PlayTimeImg" class="AchievementsImg bb"><img class="AchievementImg" src="/Images/PlayTime.png"><div id="InfoAchL">Play the game</div></div>
                    <div id="PlayTime1" class="AchievementsItem bb lb"><img id="PlayTime1Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="PlayTime2" class="AchievementsItem bb"><img id="PlayTime2Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="PlayTime3" class="AchievementsItem bb"><img id="PlayTime3Img" class="AchievementImg"><div id="InfoAchL"></div></div>
                    <div id="PlayTime4" class="AchievementsItem bb"><img id="PlayTime4Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="PlayTime5" class="AchievementsItem bb"><img id="PlayTime5Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="PlayTime6" class="AchievementsItem bb"><img id="PlayTime6Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                    <div id="PlayTime7" class="AchievementsItem rb bb"><img id="PlayTime7Img" class="AchievementImg"><div id="InfoAchR"></div></div>
                </div>
            </div>
        </div>
    </div>
  </div>
  
  <div id="wipeConfirmMenu">
    <div class="WipeBack">
      <div id="confirmWipe" class="y confirmWipe">
      <div class="wipeText">Are you sure you want to wipe your progress?</div>
            <button id="WipeNo" class="l br wipeButton"><div class="wipeButText">No</div></button>
            <button id="WipeYes" class="l br wipeButton"><div class="wipeButText">Yes</div></button>
      </div>
    </div>
  </div>
  
  <div class="br LSeperator"></div>
  
  <!--Bitcoin button-->
  <div id="BitcoinSect" class="middle y Box">
    <?php
      if (isset($_SESSION["useruid"])) {
        $lastChar = substr($_SESSION["useruid"], -1);
        if ($lastChar === 's' || $lastChar === 'S') {
          echo "<div class='loggedin'>".$_SESSION["useruid"]."' wallet</div>";
        }
        else {
          echo "<div class='loggedin'>".$_SESSION["useruid"]."'s wallet</div>";
        }
      }
      else {
        echo "<div id='LoginButton' class='r br LoginButton'>Log in</div>";
      }
    ?>
    <div class="BtcAmtBox">
      <div id="BtcAmtText" class="BtcAmtText">0 bitcoins</div>
      <div id="BtcPsText" class="BtcPsText">+0.0 bitcoins per second</div>
    </div>

    <div class="BitcoinPosition">
      <img id="MainBitcoin" class="MainBitcoin" draggable="false" src="/Images/MainBitcoin.png">
    </div>
  </div>
  
  <div class="br RSeperator"></div>
  
  <!--Shop-->
  <div id="ShopSect" class="right y Box">
    <div class="ShopTitle"><div style="padding-top: 2vh;">Shop</div></div>

    <div class="br ShopPartTitle">
      <div class="ShopPartText">Upgrades</div>
    </div>
    <div class="Upgrades">
      <div id="UpgradeBox1" class="l tb lb UpgradeBox Uninteractable">
        <img id="UpgradeImage1" class="UpgradeImage" src="/Images/Items/Lock.png">
        <div class="y InfoBox left1"><div id="UpsText1" class="InfoUpsText">This upgrade is currently locked. Continue playing to unlock upgrades.</div></div>
      </div>
      <div id="UpgradeBox2" class="l tb UpgradeBox Uninteractable">
        <img id="UpgradeImage2" class="UpgradeImage" src="/Images/Items/Lock.png">
        <div class="y InfoBox left2"><div id="UpsText2" class="InfoUpsText">This upgrade is currently locked. Continue playing to unlock upgrades.</div></div>
      </div>
      <div id="UpgradeBox3" class="l tb UpgradeBox Uninteractable">
        <img id="UpgradeImage3" class="UpgradeImage" src="/Images/Items/Lock.png">
        <div class="y InfoBox left3"><div id="UpsText3" class="InfoUpsText">This upgrade is currently locked. Continue playing to unlock upgrades.</div></div>
      </div>
      <div id="UpgradeBox4" class="l tb UpgradeBox Uninteractable">
        <img id="UpgradeImage4" class="UpgradeImage" src="/Images/Items/Lock.png">
        <div class="y InfoBox left4"><div id="UpsText4" class="InfoUpsText">This upgrade is currently locked. Continue playing to unlock upgrades.</div></div>
      </div>
      <div id="UpgradeBox5" class="l tb rb UpgradeBox Uninteractable">
        <img id="UpgradeImage5" class="UpgradeImage" src="/Images/Items/Lock.png">
        <div class="y InfoBox left5"><div id="UpsText5" class="InfoUpsText">This upgrade is currently locked. Continue playing to unlock upgrades.</div></div>
      </div>
      <div id="UpgradeBox6" class="l bb lb UpgradeBox Uninteractable">
        <img id="UpgradeImage6" class="UpgradeImage" src="/Images/Items/Lock.png">
        <div class="y InfoBox left1"><div id="UpsText6" class="InfoUpsText">This upgrade is currently locked. Continue playing to unlock upgrades.</div></div>
      </div>
      <div id="UpgradeBox7" class="l bb UpgradeBox Uninteractable">
        <img id="UpgradeImage7" class="UpgradeImage" src="/Images/Items/Lock.png">
        <div class="y InfoBox left2"><div id="UpsText7" class="InfoUpsText">This upgrade is currently locked. Continue playing to unlock upgrades.</div></div>
      </div>
      <div id="UpgradeBox8" class="l bb UpgradeBox Uninteractable">
        <img id="UpgradeImage8" class="UpgradeImage" src="/Images/Items/Lock.png">
        <div class="y InfoBox left3"><div id="UpsText8" class="InfoUpsText">This upgrade is currently locked. Continue playing to unlock upgrades.</div></div>
      </div>
      <div id="UpgradeBox9" class="l bb UpgradeBox Uninteractable">
        <img id="UpgradeImage9" class="UpgradeImage" src="/Images/Items/Lock.png">
        <div class="y InfoBox left4"><div id="UpsText9" class="InfoUpsText">This upgrade is currently locked. Continue playing to unlock upgrades.</div></div>
      </div>
      <div id="UpgradeBox10" class="l rb bb UpgradeBox Uninteractable">
        <img id="UpgradeImage10" class="UpgradeImage" src="/Images/Items/Lock.png">
        <div class="y InfoBox left5"><div id="UpsText10" class="InfoUpsText">This upgrade is currently locked. Continue playing to unlock upgrades.</div></div>
      </div>
    </div>

    <div class="br ShopPartTitle">
        <div class="l ShopPartText" style="display: inline;width: 17vw;margin-left: 8vw;">Bitcoin Generators</div>
        <div id="Multiplier" class="r ShopPartText MultiText">Buy: 1</div>
    </div>
      <div class="Items">
        <div id="Item1" class="tb ItemBox Uninteractable">
          <div class="l ItemImg"><img class="ShopItemImg" src="/Images/Items/Item1.png"></div>
          <div class="l ItemText">
            <div id="Item1Title" class="l ItemTitle">Abacus 1x</div>
            <div id="Item1Owned" class="r ItemOwned">0</div>
            <div id="Item1Price" class="ItemPrice">Price: 10<br>Each generates: 0.1 BTC per second</div>
          </div>
        </div>
        <div id="Item2" class="ItemBox Uninteractable">
          <div class="l ItemImg"><img class="ShopItemImg" src="/Images/Items/Item2.png"></div>
          <div class="l ItemText">
            <div id="Item2Title" class="l ItemTitle">Grandpa 1x</div>
            <div id="Item2Owned" class="r ItemOwned">0</div>
            <div id="Item2Price" class="ItemPrice">Price: 100<br>Each generates: 1 BTC per second</div>
          </div>
        </div>
        <div id="Item3" class="ItemBox Uninteractable">
          <div class="l ItemImg"><img class="ShopItemImg" src="/Images/Items/Item3.png"></div>
          <div class="l ItemText">
            <div id="Item3Title" class="l ItemTitle">Mining Rig 1x</div>
            <div id="Item3Owned" class="r ItemOwned">0</div>
            <div id="Item3Price" class="ItemPrice">Price: 1.00 K<br>Each generates: 10 BTC per second</div>
          </div>
        </div>
        <div id="Item4" class="ItemBox Uninteractable">
          <div class="l ItemImg"><img class="ShopItemImg" src="/Images/Items/Item4.png"></div>
          <div class="l ItemText">
            <div id="Item4Title" class="l ItemTitle">Hacker 1x</div>
            <div id="Item4Owned" class="r ItemOwned">0</div>
            <div id="Item4Price" class="ItemPrice">Price: 10.00 K<br>Each generates: 100 BTC per second</div>
          </div>
        </div>
        <div id="Item5" class="ItemBox Uninteractable">
          <div class="l ItemImg"><img class="ShopItemImg" src="/Images/Items/Item5.png"></div>
          <div class="l ItemText">
            <div id="Item5Title" class="l ItemTitle">Private Server 1x</div>
            <div id="Item5Owned" class="r ItemOwned">0</div>
            <div id="Item5Price" class="ItemPrice">Price: 100.00 K<br>Each generates: 1 K BTC per second</div>
          </div>
        </div>
        <div id="Item6" class="ItemBox Uninteractable">
          <div class="l ItemImg"><img class="ShopItemImg" src="/Images/Items/Item6.png"></div>
          <div class="l ItemText">
            <div id="Item6Title" class="l ItemTitle">Cloning Machine 1x</div>
            <div id="Item6Owned" class="r ItemOwned">0</div>
            <div id="Item6Price" class="ItemPrice">Price: 1.00 M<br>Each generates: 10 K BTC per second</div>
          </div>
        </div>
        <div id="Item7" class="ItemBox Uninteractable">
          <div class="l ItemImg"><img class="ShopItemImg" src="/Images/Items/Item7.png"></div>
          <div class="l ItemText">
            <div id="Item7Title" class="l ItemTitle">Quantum Computer 1x</div>
            <div id="Item7Owned" class="r ItemOwned">0</div>
            <div id="Item7Price" class="ItemPrice">Price: 10.00 M<br>Each generates: 100 K BTC per second</div>
          </div>
        </div>
        <div id="Item8" class="ItemBox Uninteractable">
          <div class="l ItemImg"><img class="ShopItemImg" src="/Images/Items/Item8.png"></div>
          <div class="l ItemText">
            <div id="Item8Title" class="l ItemTitle">Galaxy 1x</div>
            <div id="Item8Owned" class="r ItemOwned">0</div>
            <div id="Item8Price" class="ItemPrice">Price: 100.00 M<br>Each generates: 1 M BTC per second</div>
          </div>
        </div>
        <div id="Item9" class="ItemBox Uninteractable">
          <div class="l ItemImg"><img class="ShopItemImg" src="/Images/Items/Item9.png"></div>
          <div class="l ItemText">
            <div id="Item9Title" class="l ItemTitle">Universe 1x</div>
            <div id="Item9Owned" class="r ItemOwned">0</div>
            <div id="Item9Price" class="ItemPrice">Price: 1.00 B<br>Each generates: 10 M BTC per second</div>
          </div>
        </div>
        <div id="Item10" class="bb ItemBox Uninteractable">
          <div class="l ItemImg"><img class="ShopItemImg" src="/Images/Items/Item10.png" style="margin-top: calc(5% + 1.2vh);"></div>
          <div class="l ItemText">
            <div id="Item10Title" class="l ItemTitle">Multiverse 1x</div>
            <div id="Item10Owned" class="r ItemOwned">0</div>
            <div id="Item10Price" class="ItemPrice">Price: 10.00 B<br>Each generates: 100 M BTC per second</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!--Login menu-->
  <div id="LoginSystem">
    <div class="LoginBack"></div>
    <div id="LoginMenu" class="y LoginMenu">
      <div id="LogIn" class="LogInForm">
        <div class="LoginMenuText">Log in</div>
        <div id="CloseLogin" class="CloseLogin">X</div>
        <form action="php/login.inc.php" method="post">
    	    <input class="InputField" spellcheck="false" type="text" name="uid" placeholder="Username/Email..." required>
            <input class="InputField" spellcheck="false" type="password" name="pwd" placeholder="Password..." required>
            <button class="SigninButton" type="submit" name="login">Log in</button>
        </form>
        <div class="SwitchLoginText">Don't have an account yet? <span class="Signup">Sign up!</span></div>
      </div>
    </div>
    <div id="SignupMenu" class="y SignupMenu Inactive">
      <div id="SignUp" class="SignUpForm Inactive">
        <div class="LoginMenuText">Sign up</div>
        <div id="CloseSignup" class="CloseSignup">X</div>
        <form action="php/signup.inc.php" method="post">
            <input class="InputField" spellcheck="false" type="text" name="uid" placeholder="Username..." required>
            <input class="InputField" spellcheck="false" type="text" name="email" placeholder="Email..." required>
            <input class="InputField" spellcheck="false" type="password" name="pwd" placeholder="Password..." required>
            <input class="InputField" spellcheck="false" type="password" name="pwdrepeat" placeholder="Repeat password..." required>
            <button class="SigninButton" spellcheck="false" type="submit" name="signup">Sign up</button>
        </form>
        <div class="SwitchLoginText">Already have an account? <span class="Login">Log in!</span></div>
      </div>
    </div>
  </div>
  <div id="LogoutSystem">
    <div class="LogoutBack">
        <div id="LogoutMenu" class="y LogoutMenu">
            <div class="LogoutText">Are you sure you want to log out?</div>
            <button id="LogoutNo" class="l br LogoutButton"><div class="LogoutButText">No</div></button>
            <form action="php/logout.inc.php" method="post">
                <button id="LogoutYes" class="r br LogoutButton" type="submit" name="logout"><div class="LogoutButText">Yes</div></button>
            </form>
        </div>
    </div>
  </div>
  
  <!--Error messages-->
  <div>
    <div id="invuid" class='Signuperror Inactive'>The username/email you filled in has unvalid characters!</div>
    <div id="invemail" class='Signuperror Inactive'>The email you filled in is invalid!</div>
    <div id="diffpwds" class='Signuperror Inactive'>The two passwords you filled in are different!</div>
    <div id="uidtaken" class='Signuperror Inactive'>The username or email you filled in is already taken!</div>
    <div id="error" class='Signuperror Inactive'>Something went wrong, please try again!</div>
    <div id="signupsuccess" class='Signuperror Inactive'>You signed up succesfully! Login here!</div>
    <div id="wronguidemail" class='Signuperror Inactive'>The username/email you filled in doesn't exist!</div>
    <div id="wrongpwd" class='Signuperror Inactive'>The password you filled in was incorrect!</div>
    <div id="loginsuccess" class='Signuperror Inactive'>You logged in succesfully!</div>
    <div id="wipedProgress" class='Signuperror Inactive'>You wiped your progress succesfully!</div>
  </div>
</body></html>
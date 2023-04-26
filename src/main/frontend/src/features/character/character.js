import { createSlice } from '@reduxjs/toolkit';



// The useHomeBrewContent for d&d beyond is at state.preferences.useHomebrewContent
// However, the other source options are at state.sourceCategories. 
// When I click the button on D&D beyond, this happens:
// {
//     type: 'character.ACTIVE_SOURCE_CATEGORIES_SET_COMMIT',
//     payload: {
//       activeSourceCategories: [
//         1,
//         7,
//         8,
//         10,
//         12,
//         14
//       ]
//     },
//     meta: {}
//   }
// ah, so they actually have state.sourceCategories and state.activeSourceCategories
// when i disable all it is this:
// {
//     type: 'character.ACTIVE_SOURCE_CATEGORIES_SET_COMMIT',
//     payload: {
//       activeSourceCategories: [
//         1,
//         10
//       ]
//     },
//     meta: {}
//   }
// activating all i get this
// {
//     type: 'character.ACTIVE_SOURCE_CATEGORIES_SET_COMMIT',
//     payload: {
//       activeSourceCategories: [
//         1,
//         10,
//         2,
//         7,
//         8,
//         12,
//         14
//       ]
//     },
//     meta: {}
//   }
// so it looks like the state.character.sourceCategories corresponds to these numbers. state.ruledata.sourceCategories[0] has id=1, name = "Core D&D", and description = null. It looks like these correspond to the ID and not the index. 1 is core, 10 is rick and morty, 15 is minecraft, 
// Index	 id	 name	 description	 isHideable	 isEnabledByDefault	 isToggleable	 avatarUrl	 isPartneredContent
//  0	1	Core D&D	null	false	true	false	null	false
//  1	2	Critical Role	null	true	false	true	https://www.dndbeyond.com/avatars/105/174/636512853628516966.png?width=150&height=150&fit=crop&quality=95&auto=webp	false
//  2	3	Playtest	<p><span style="color: #ff0000;"><strong>THIS IS UNOFFICIAL MATERIAL</strong></span></p> <p>The material here is presented for playtesting and to spark your imagination. These game mechanics are in draft form, usable in your campaign but not refined by&nbsp;full game design and editing. They aren&rsquo;t officially part of the game and aren&rsquo;t permitted in D&amp;D Adventurers League events.</p> <p>If this material is made official, it will be refined based on your feedback, and then it will appear in a D&amp;D product that you can unlock on DDB.</p> <p>If this material is not made official, it will be removed from D&amp;D Beyond following the playtest period and you will need to replace it with another option.</p>	false	false	false	https://www.dndbeyond.com/avatars/110/171/636516074887091041.png?width=150&height=150&fit=crop&quality=95&auto=webp	false
//  3	6	D&D Beyond	<p>D&amp;D Beyond</p>	false	false	false	null	false
//  4	7	Magic: The Gathering	<p>Magic: The Gathering content for fifth edition Dungeons &amp; Dragons</p>	false	true	true	null	false
//  5	8	Eberron	<p>The Eberron campaign setting for&nbsp;fifth edition Dungeons &amp; Dragons</p>	false	true	true	https://www.dndbeyond.com/avatars/2588/861/636681435608150525.png?width=150&height=150&fit=crop&quality=95&auto=webp	false
//  6	9	Archived	<p>The Graveyard</p>	false	false	false	null	false
//  7	10	Rick and Morty	<p>Source category for Rick and Morty products.</p>	true	false	true	null	true
//  8	11	Runeterra	<p><span style="color: #ff0000;"><strong>THIS IS UNOFFICIAL MATERIAL</strong></span></p> <p>These game mechanics are usable in your campaign if your DM allows them but not refined by final game design and editing. They aren&rsquo;t officially part of the Dungeons &amp; Dragons game and aren&rsquo;t permitted in D&amp;D Adventurers League events unless otherwise stated.</p>	false	false	false	https://www.dndbeyond.com/avatars/11008/904/637274855809570341.png?width=150&height=150&fit=crop&quality=95&auto=webp	true
//  9	12	Noncore D&D	<p><span style="color: #ff0000;"><strong>THIS IS NONCORE D&amp;D MATERIAL</strong></span></p> <p>These game mechanics are usable in your campaign if your DM allows them but not refined by final game design and editing.</p>	false	false	true	null	false
//  10	13	Adventurers League	<p>Adventurers League content for fifth edition Dungeons &amp; Dragons</p>	false	false	false	null	false
//  11	14	Dragonlance	<p>The Dragonlance campaign setting for fifth edition Dungeons &amp; Dragons.</p>	false	true	true	null	false
//  12	15	Minecraft	null	false	false	true	null	true
//  13	16	Misc. Content	null

const preferences = {
    useHomebrewContent: true,
    progressionType: 2,
    encumbranceType: 1,
    ignoreCoinWeight: false,
    hitPointType: 2,
    showUnarmedStrike: false,
    showScaledSpells: true,
    primarySense: 5,
    primaryMovement: 1,
    privacyType: 3,
    sharingType: 2,
    abilityScoreDisplayType: 2,
    enforceFeatRules: true,
    enforceMulticlassRules: true,
    enableOptionalClassFeatures: true,
    enableOptionalOrigins: true,
    enableDarkMode: false,
    enableContainerCurrency: false,
}

const sourceCategories = [
    {
        "id": 1,
        "name": "Core D&D",
        "description": "The core rulebooks that form the foundation of Dungeons & Dragons.",
        "enabledByDefault": true
    },
    {
        "id": 2,
        "name": "Critical Role",
        "description": "Content related to the Critical Role universe and campaign settings.",
        "enabledByDefault": false
    },
    {
        "id": 3,
        "name": "Magic: The Gathering",
        "description": "Content related to the Magic: The Gathering multiverse.",
        "enabledByDefault": false
    },
    {
        "id": 4,
        "name": "Eberron",
        "description": "Content related to the Eberron campaign setting.",
        "enabledByDefault": false
    },
    {
        "id": 5,
        "name": "Dragonlance",
        "description": "Content related to the Dragonlance campaign setting.",
        "enabledByDefault": false
    },
    {
        "id": 6,
        "name": "Noncore D&D",
        "description": "Additional D&D content that is not part of the core rulebooks.",
        "enabledByDefault": false
    }
]
// Core D&D: (Category id 1)

// DMG (Dungeon Master's Guide)
// MM (Monster Manual)
// PHB (Player's Handbook)
// Critical Role: (Category id 2)

// CRCotN (Critical Role: Call of the Netherdeep)
// Magic: The Gathering: (Category id 3)

// MOT (Mythic Odysseys of Theros)
// GGR (Guildmasters' Guide to Ravnica)
// Eberron: (Category id 4)

// ERLW (Eberron: Rising from the Last War)
// Dragonlance: (Category id 5)

// DSotDQ (Dragonlance: Shadow of the Dragon Queen)
// Noncore D&D: (Category id 6)

// AI (Acquisitions Incorporated)
// AAG (Astral Adventurer's Guide)
// BGDIA (Baldur's Gate: Descent Into Avernus)
// BAM (Boo's Astral Menagerie)
// CM (Candlekeep Mysteries)
// DC (Divine Contention)
// CoS (Curse of Strahd)
// EET (Elemental Evil: Trinkets)
// EGW (Explorer's Guide to Wildemount)
// FTD (Fizban's Treasury of Dragons)
// GoS (Ghosts of Saltmarsh)
// HotDQ (Hoard of the Dragon Queen)
// HftT (Hunt for the Thessalhydra)
// IDRotF (Icewind Dale: Rime of the Frostmaiden)
// JttRC (Journeys through the Radiant Citadel)
// KAGV (Keys from the Golden Vault)
// LoX (Light of Xaryxis)
// LMoP (Lost Mine of Phandelver)
// MPMM (Mordenkainen Presents: Monsters of the Multiverse)
// MTF (Mordenkainen's Tome of Foes)
// OotA (Out of the Abyss)
// PotA (Princes of the Apocalypse)
// SDW (Sleeping Dragon's Wake)
// SKT (Storm King's Thunder)
// SAC (Strixhaven: A Curriculum of Chaos)
// SCAG (Sword Coast Adventurer's Guide)
// TAYP (Tales from the Yawning Portal)
// TCE (Tasha's Cauldron of Everything)
// RMBRE (The Lost Dungeon of Rickedness: Big Rick Energy)
// RoT (The Rise of Tiamat)
// TROS (The Rise of Tiamat Online Supplement)
// WBtW (The Wild Beyond the Witchlight)
// TOA (Tomb of Annihilation)
// TOD (Tyranny of Dragons)
// VGM (Volo's Guide to Monsters)
// WDH (Waterdeep: Dragon Heist)
// WDMM (Waterdeep: Dungeon of the Mad Mage)
// XGE (Xanathar's Guide to Everything)
const sources = [
    {
        "id": 1,
        "sourceCategoryId": 1,
        "name": "DMG",
        "description": "Dungeon Master's Guide"
    },
    {
        "id": 2,
        "sourceCategoryId": 1,
        "name": "MM",
        "description": "Monster Manual"
    },
    {
        "id": 3,
        "sourceCategoryId": 1,
        "name": "PHB",
        "description": "Player's Handbook"
    },
    {
        "id": 4,
        "sourceCategoryId": 2,
        "name": "CRCotN",
        "description": "Critical Role: Call of the Netherdeep"
    },
    {
        "id": 5,
        "sourceCategoryId": 3,
        "name": "MOT",
        "description": "Mythic Odysseys of Theros"
    },
    {
        "id": 6,
        "sourceCategoryId": 3,
        "name": "GGR",
        "description": "Guildmasters' Guide to Ravnica"
    },
    {
        "id": 7,
        "sourceCategoryId": 4,
        "name": "ERLW",
        "description": "Eberron: Rising from the Last War"
    },
    {
        "id": 8,
        "sourceCategoryId": 5,
        "name": "DSotDQ",
        "description": "Dragonlance: Shadow of the Dragon Queen"
    },
    {
        "id": 9,
        "sourceCategoryId": 6,
        "name": "AI",
        "description": "Acquisitions Incorporated"
    },
    {
        "id": 10,
        "sourceCategoryId": 6,
        "name": "AAG",
        "description": "Astral Adventurer's Guide"
    },
    {
        "id": 11,
        "sourceCategoryId": 6,
        "name": "BGDIA",
        "description": "Baldur's Gate: Descent Into Avernus"
    },
    {
        "id": 12,
        "sourceCategoryId": 6,
        "name": "BAM",
        "description": "Boo's Astral Menagerie"
    },
    {
        "id": 13,
        "sourceCategoryId": 6,
        "name": "CM",
        "description": "Candlekeep Mysteries"
    },
    {
        "id": 14,
        "sourceCategoryId": 6,
        "name": "DC",
        "description": "Divine Contention"
    },
    { "id": 15, "sourceCategoryId": 6, "name": "CoS", "description": "Curse of Strahd" }, { "id": 16, "sourceCategoryId": 6, "name": "EET", "description": "Elemental Evil: Trinkets" }, { "id": 17, "sourceCategoryId": 6, "name": "EGW", "description": "Explorer's Guide to Wildemount" }, { "id": 18, "sourceCategoryId": 6, "name": "FTD", "description": "Fizban's Treasury of Dragons" }, { "id": 19, "sourceCategoryId": 6, "name": "GoS", "description": "Ghosts of Saltmarsh" }, { "id": 20, "sourceCategoryId": 6, "name": "HotDQ", "description": "Hoard of the Dragon Queen" }, { "id": 21, "sourceCategoryId": 6, "name": "HftT", "description": "Hunt for the Thessalhydra" }, { "id": 22, "sourceCategoryId": 6, "name": "IDRotF", "description": "Icewind Dale: Rime of the Frostmaiden" }, { "id": 23, "sourceCategoryId": 6, "name": "JttRC", "description": "Journeys through the Radiant Citadel" }, { "id": 24, "sourceCategoryId": 6, "name": "KAGV", "description": "Keys from the Golden Vault" }, { "id": 25, "sourceCategoryId": 6, "name": "LoX", "description": "Light of Xaryxis" }, { "id": 26, "sourceCategoryId": 6, "name": "LMoP", "description": "Lost Mine of Phandelver" }, { "id": 27, "sourceCategoryId": 6, "name": "MPMM", "description": "Mordenkainen Presents: Monsters of the Multiverse" }, { "id": 28, "sourceCategoryId": 6, "name": "MTF", "description": "Mordenkainen's Tome of Foes" }, { "id": 29, "sourceCategoryId": 6, "name": "OotA", "description": "Out of the Abyss" }, { "id": 30, "sourceCategoryId": 6, "name": "PotA", "description": "Princes of the Apocalypse" }, { "id": 31, "sourceCategoryId": 6, "name": "SDW", "description": "Sleeping Dragon's Wake" }, { "id": 32, "sourceCategoryId": 6, "name": "SKT", "description": "Storm King's Thunder" }, { "id": 33, "sourceCategoryId": 6, "name": "SAC", "description": "Strixhaven: A Curriculum of Chaos" }, { "id": 34, "sourceCategoryId": 6, "name": "SCAG", "description": "Sword Coast Adventurer's Guide" }, { "id": 35, "sourceCategoryId": 6, "name": "TAYP", "description": "Tales from the Yawning Portal" }, { "id": 36, "sourceCategoryId": 6, "name": "TCE", "description": "Tasha's Cauldron of Everything" }, { "id": 37, "sourceCategoryId": 6, "name": "RMBRE", "description": "The Lost Dungeon of Rickedness: Big Rick Energy" }
]



const initialState = {
    name: 'Ron',
    preferences,
    sourceCategories,
    sources
};


const characterSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        updatePreference: (state, action) => {
            const { preference, value } = action.payload;
            state.preferences[preference] = value;
        },
    },
});

export const { updateField, updatePreference } = characterSlice.actions;
export default characterSlice.reducer;

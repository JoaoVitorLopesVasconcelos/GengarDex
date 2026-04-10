const jogosPokemon = [

    {
        nome: "Pokémon FireRed",
        descricao: "Região de Kanto - clássico para iniciantes.",
        times: [
            {
                nome: "Time Balanceado",
                pokemons: [
                    { nome: "Charizard", item: "Charcoal", nature: "Modest", moves: ["Flamethrower", "Fly", "Dragon Claw", "Slash"] },
                    { nome: "Jolteon", item: "Magnet", nature: "Timid", moves: ["Thunderbolt", "Thunder Wave", "Shadow Ball", "Quick Attack"] },
                    { nome: "Lapras", item: "Mystic Water", nature: "Calm", moves: ["Surf", "Ice Beam", "Thunderbolt", "Confuse Ray"] },
                    { nome: "Snorlax", item: "Leftovers", nature: "Adamant", moves: ["Body Slam", "Rest", "Shadow Ball", "Earthquake"] },
                    { nome: "Exeggutor", item: "Miracle Seed", nature: "Modest", moves: ["Psychic", "Sleep Powder", "Giga Drain", "Sunny Day"] },
                    { nome: "Nidoking", item: "Soft Sand", nature: "Adamant", moves: ["Earthquake", "Sludge Bomb", "Megahorn", "Rock Slide"] }
                ]
            }
        ]
    },

    {
        nome: "Pokémon Emerald",
        descricao: "Hoenn com dificuldade maior e mais estratégia.",
        times: [
            {
                nome: "Time Forte",
                pokemons: [
                    { nome: "Swampert", item: "Leftovers", nature: "Relaxed", moves: ["Surf", "Earthquake", "Ice Beam", "Protect"] },
                    { nome: "Gardevoir", item: "Twisted Spoon", nature: "Modest", moves: ["Psychic", "Calm Mind", "Thunderbolt", "Shadow Ball"] },
                    { nome: "Breloom", item: "Black Belt", nature: "Adamant", moves: ["Sky Uppercut", "Mach Punch", "Spore", "Leech Seed"] },
                    { nome: "Manectric", item: "Magnet", nature: "Timid", moves: ["Thunderbolt", "Bite", "Thunder Wave", "Quick Attack"] },
                    { nome: "Flygon", item: "Soft Sand", nature: "Jolly", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Fly"] },
                    { nome: "Torkoal", item: "Charcoal", nature: "Bold", moves: ["Flamethrower", "Body Slam", "Curse", "Protect"] }
                ]
            }
        ]
    },

    {
        nome: "Pokémon Platinum",
        descricao: "Sinnoh com mecânicas modernas.",
        times: [
            {
                nome: "Time Completo",
                pokemons: [
                    { nome: "Infernape", item: "Life Orb", nature: "Naive", moves: ["Flamethrower", "Close Combat", "Grass Knot", "U-turn"] },
                    { nome: "Gyarados", item: "Leftovers", nature: "Adamant", moves: ["Waterfall", "Ice Fang", "Dragon Dance", "Earthquake"] },
                    { nome: "Roserade", item: "Black Sludge", nature: "Timid", moves: ["Energy Ball", "Sludge Bomb", "Sleep Powder", "Shadow Ball"] },
                    { nome: "Lucario", item: "Expert Belt", nature: "Adamant", moves: ["Close Combat", "Extreme Speed", "Crunch", "Swords Dance"] },
                    { nome: "Garchomp", item: "Soft Sand", nature: "Jolly", moves: ["Earthquake", "Dragon Claw", "Stone Edge", "Swords Dance"] },
                    { nome: "Togekiss", item: "Leftovers", nature: "Calm", moves: ["Air Slash", "Aura Sphere", "Thunder Wave", "Roost"] }
                ]
            }
        ]
    },

    {
        nome: "Pokémon HeartGold/SoulSilver",
        descricao: "Johto + Kanto, longa jornada.",
        times: [
            {
                nome: "Time Equilibrado",
                pokemons: [
                    { nome: "Typhlosion", item: "Charcoal", nature: "Modest", moves: ["Flamethrower", "Focus Blast", "Swift", "Sunny Day"] },
                    { nome: "Ampharos", item: "Magnet", nature: "Modest", moves: ["Thunderbolt", "Signal Beam", "Thunder Wave", "Light Screen"] },
                    { nome: "Heracross", item: "Black Belt", nature: "Adamant", moves: ["Close Combat", "Megahorn", "Rock Slide", "Night Slash"] },
                    { nome: "Gyarados", item: "Leftovers", nature: "Adamant", moves: ["Waterfall", "Ice Fang", "Dragon Dance", "Earthquake"] },
                    { nome: "Espeon", item: "Twisted Spoon", nature: "Timid", moves: ["Psychic", "Shadow Ball", "Calm Mind", "Morning Sun"] },
                    { nome: "Dragonite", item: "Lum Berry", nature: "Adamant", moves: ["Dragon Dance", "Outrage", "Earthquake", "Fire Punch"] }
                ]
            }
        ]
    },

    {
        nome: "Pokémon Black/White",
        descricao: "Região de Unova, só Pokémon novos.",
        times: [
            {
                nome: "Time Forte",
                pokemons: [
                    { nome: "Samurott", item: "Mystic Water", nature: "Modest", moves: ["Surf", "Ice Beam", "Megahorn", "Aqua Jet"] },
                    { nome: "Excadrill", item: "Soft Sand", nature: "Adamant", moves: ["Earthquake", "Iron Head", "Rock Slide", "Swords Dance"] },
                    { nome: "Chandelure", item: "Charcoal", nature: "Modest", moves: ["Flamethrower", "Shadow Ball", "Energy Ball", "Calm Mind"] },
                    { nome: "Galvantula", item: "Magnet", nature: "Timid", moves: ["Thunder", "Bug Buzz", "Volt Switch", "Energy Ball"] },
                    { nome: "Scrafty", item: "Black Belt", nature: "Adamant", moves: ["Crunch", "Drain Punch", "Dragon Dance", "Ice Punch"] },
                    { nome: "Haxorus", item: "Dragon Fang", nature: "Jolly", moves: ["Dragon Claw", "Earthquake", "Dragon Dance", "Rock Slide"] }
                ]
            }
        ]
    },

    {
        nome: "Pokémon X/Y",
        descricao: "Kalos com mega evoluções.",
        times: [
            {
                nome: "Time Meta",
                pokemons: [
                    { nome: "Greninja", item: "Life Orb", nature: "Timid", moves: ["Surf", "Ice Beam", "Dark Pulse", "Extrasensory"] },
                    { nome: "Talonflame", item: "Sharp Beak", nature: "Jolly", moves: ["Brave Bird", "Flare Blitz", "U-turn", "Roost"] },
                    { nome: "Aegislash", item: "Leftovers", nature: "Quiet", moves: ["Shadow Ball", "Sacred Sword", "King's Shield", "Flash Cannon"] },
                    { nome: "Garchomp", item: "Soft Sand", nature: "Jolly", moves: ["Earthquake", "Dragon Claw", "Stone Edge", "Swords Dance"] },
                    { nome: "Sylveon", item: "Pixie Plate", nature: "Calm", moves: ["Moonblast", "Wish", "Protect", "Shadow Ball"] },
                    { nome: "Lucario", item: "Lucarionite", nature: "Adamant", moves: ["Close Combat", "Bullet Punch", "Swords Dance", "Crunch"] }
                ]
            }
        ]
    },

    {
        nome: "Pokémon Sun/Moon",
        descricao: "Alola e mecânica de Z-Moves.",
        times: [
            {
                nome: "Time Completo",
                pokemons: [
                    { nome: "Decidueye", item: "Miracle Seed", nature: "Adamant", moves: ["Leaf Blade", "Spirit Shackle", "Sucker Punch", "Roost"] },
                    { nome: "Toxapex", item: "Black Sludge", nature: "Bold", moves: ["Scald", "Toxic", "Recover", "Baneful Bunker"] },
                    { nome: "Arcanine", item: "Leftovers", nature: "Adamant", moves: ["Flare Blitz", "Extreme Speed", "Wild Charge", "Morning Sun"] },
                    { nome: "Garchomp", item: "Soft Sand", nature: "Jolly", moves: ["Earthquake", "Dragon Claw", "Stone Edge", "Swords Dance"] },
                    { nome: "Alakazam", item: "Life Orb", nature: "Timid", moves: ["Psychic", "Shadow Ball", "Focus Blast", "Calm Mind"] },
                    { nome: "Tapu Koko", item: "Magnet", nature: "Timid", moves: ["Thunderbolt", "Volt Switch", "Dazzling Gleam", "U-turn"] }
                ]
            }
        ]
    }

];
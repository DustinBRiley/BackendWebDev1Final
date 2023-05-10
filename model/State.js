const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    stateCode: {
        type: String,
        required: true,
        Unique: true
    },
    funfacts: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('State', stateSchema);

ks
State Motto: Motto of Kansas is “To the Stars Through Difficulties”
Origin of State Name:  From the Sioux Indian for “south wind people”
Bird:  Western Meadowlark
mo
State Motto: Salus Populi Suprema Lex Esto which is Latin for “The welfare of the people shall be the supreme law”
Origin of State Name:  Named after Missouri Indian tribe whose name means “town of the large canoes”
Bird: Bluebird
ok
State Motto:  Oklahoma – In God We Trust!
Origin of State Name:  Based on Choctaw Indian words for “red man”
Bird:  Scissor-tailed Flycatcher
ne
State Motto: Equality before the law
Origin of State Name: Name based on an Otoe Indian word meaning “flat water,” referring to the Platte River
Bird:  Western Meadowlark
co
State Motto: Nil sine Numine which translates to “Nothing without the Deity”
Origin of State Name: Taken from the Spanish for the color red, referring to the banks of the Colorado river.
Bird: Lark Bunting
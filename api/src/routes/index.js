const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Country, Activity, Op } = require('../db')


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




router.get('/countries', async (req, res) => {
    const name = req.query.name

    const countries = await Country.findAndCountAll({
        order: [["name", "ASC"]],
    });

    if (name) {
        const country = await Country.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            order: [["name", "ASC"]],
        });
        if (country.count === 0) {
            res.send({
                count: 0,
                rows: ["No existe"],
            });
        } else {
            res.json(country);
        }
    } else {
        res.status(200).send(countries)
    }



})

router.get('/countries/:idPais', async (req, res) => {
    const { idPais } = req.params;
    if (idPais.length === 3) {
        try {
            const country = await Country.findByPk(idPais.toUpperCase(), {
                include: [{
                    model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through: {
                        attributes: []
                    }
                }]
            })
            res.json(country || 'Country not found')
        } catch (error) {
            res.send(error)
        }
    } else {
        res.status(404).json('Country code should contain 3 characters')
    }
})

router.get("/activities", async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: {
                model: Country,
                attributes: ["name", "flag", "cod3letras"],
                through: {
                    attributes: [],
                },
            },
        });
        if (!activities.length) {
            res.send("No activities planned");
        } else {
            res.send(activities);
        }
    } catch (error) {
        res.send(error);
    }
});

router.post('/activities', async (req, res) => {
    let { name, difficulty, duration, season, countryCode } = req.body;

    try {
        const activity = await Activity.findOrCreate({
            where: {
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season,
            },
        });
        if (countryCode.length === 1) {
            const country = await Country.findOne({
                where: {
                    cod3letras: countryCode[0],
                },
            });
            await activity[0].addCountry(country);

            res.send(country);
        }
        if (countryCode.length > 1) {
            await activity[0].addCountries(countryCode);
            res.send(countryCode);
        }
    } catch (error) {
        res.send(error);
    }
});

router.delete('/activities/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await Activity.destroy({
            where: {
                id: id
            }
        })
        res.json(activity)
    } catch (error) {
        res.send(error)
    }
});






module.exports = router;

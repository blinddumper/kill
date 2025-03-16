import {
    CompositeFairing,
    Diameter,
    Engines,
    FirstStage,
    ISP,
    LandingLegs,
    Mass,
    Payloads,
    PayloadWeight,
    Rocket,
    SecondStage,
    Thrust,
} from '../models/rocket';

export function getRocket(): Rocket {
    let height = new Diameter();
    height.meters = 22.25;
    height.feet = 73;

    let diameter = new Diameter();
    diameter.meters = 1.68;
    diameter.feet = 5.5;

    let mass = new Mass();
    mass.kg = 30146;
    mass.lb = 66460;

    let payloadWeight = new PayloadWeight();
    payloadWeight.id = 'leo';
    payloadWeight.name = 'Low Earth Orbit';
    payloadWeight.kg = 450;
    payloadWeight.lb = 992;

    let payloadWeights = [payloadWeight];

    let firstStageThrustSeaLevel = new Thrust();
    firstStageThrustSeaLevel.kN = 420;
    firstStageThrustSeaLevel.lbf = 94000;

    let firstStageThrustVacuum = new Thrust();
    firstStageThrustVacuum.kN = 480;
    firstStageThrustVacuum.lbf = 110000;

    let firstStage = new FirstStage();
    firstStage.reusable = false;
    firstStage.engines = 1;
    firstStage.fuel_amount_tons = 44.3;
    firstStage.burn_time_sec = 169;
    firstStage.thrust_sea_level = firstStageThrustSeaLevel;
    firstStage.thrust_vacuum = firstStageThrustVacuum;

    let secondStageThrust = new Thrust();
    secondStageThrust.kN = 31;
    secondStageThrust.lbf = 7000;

    let compositeFairingHeight = new Diameter();
    compositeFairingHeight.meters = 3.5;
    compositeFairingHeight.feet = 11.5;

    let compositeFairingDiameter = new Diameter();
    compositeFairingDiameter.meters = 1.5;
    compositeFairingDiameter.feet = 4.9;

    let payloadsCompositeFairing = new CompositeFairing();
    payloadsCompositeFairing.height = compositeFairingHeight;
    payloadsCompositeFairing.diameter = compositeFairingDiameter;

    let payloads = new Payloads();
    payloads.option_1 = 'composite fairing';
    payloads.composite_fairing = payloadsCompositeFairing;

    let secondStage = new SecondStage();
    secondStage.reusable = false;
    secondStage.engines = 1;
    secondStage.fuel_amount_tons = 3.38;
    secondStage.burn_time_sec = 378;
    secondStage.thrust = secondStageThrust;
    secondStage.payloads = payloads;

    let enginesIsp = new ISP();
    enginesIsp.sea_level = 267;
    enginesIsp.vacuum = 304;

    let enginesThrustSeaLevel = new Thrust();
    enginesThrustSeaLevel.kN = 420;
    enginesThrustSeaLevel.lbf = 94000;

    let enginesThrustVacuum = new Thrust();
    enginesThrustVacuum.kN = 480;
    enginesThrustVacuum.lbf = 110000;

    let engines = new Engines();
    engines.number = 1;
    engines.type = 'merlin';
    engines.version = '1C';
    engines.isp = enginesIsp;
    engines.engine_loss_max = 0;
    engines.propellant_1 = 'liquid oxygen';
    engines.propellant_2 = 'RP-1 kerosene';
    engines.thrust_sea_level = enginesThrustSeaLevel;
    engines.thrust_vacuum = enginesThrustVacuum;
    engines.thrust_to_weight = 96;

    let landingLegs = new LandingLegs();
    landingLegs.number = 0;
    landingLegs.material = null;

    let rocket = new Rocket();
    rocket.id = 1;
    rocket.active = false;
    rocket.stages = 2;
    rocket.boosters = 0;
    rocket.cost_per_launch = 6700000;
    rocket.success_rate_pct = 40;
    rocket.first_flight = new Date('2006-03-24');
    rocket.country = 'Republic of the Marshall Islands';
    rocket.company = 'SpaceX';

    rocket.height = height;
    rocket.diameter = diameter;
    rocket.mass = mass;
    rocket.payload_weights = payloadWeights;

    rocket.first_stage = firstStage;
    rocket.second_stage = secondStage;
    rocket.engines = engines;

    rocket.landing_legs = landingLegs;
    rocket.flickr_images = [
        'https://imgur.com/DaCfMsj.jpg',
        'https://imgur.com/azYafd8.jpg',
    ];
    rocket.wikipedia = 'https://en.wikipedia.org/wiki/Falcon_1';
    rocket.description =
        'The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.';
    rocket.rocket_id = 'falcon1';
    rocket.rocket_name = 'Falcon 1';
    rocket.rocket_type = 'rocket';

    return rocket;
}

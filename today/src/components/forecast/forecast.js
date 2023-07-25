import { Accordion, AccordionItem, AccordionItemPanel, AccordionItemHeading, AccordionItemButton } from "react-accessible-accordion"
import './forecast.css'

const WEEK_DAY = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAY.slice(dayInAWeek, WEEK_DAY.length).concat(
        WEEK_DAY.slice(0, dayInAWeek)
    );

    return (
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, idx) => (

                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`} />
                                    <lable className="day">{forecastDays[idx]}</lable>
                                    <lable className="description">{item.weather[0].description}</lable>
                                    <lable className="min-max">{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C </lable>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <lable>Pressure</lable>
                                    <label>{item.main.pressure}hPa</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <lable>Humidity</lable>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <lable>Clouds</lable>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <lable>Wind</lable>
                                    <label>{item.wind.speed}m/s</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <lable>Sea Level</lable>
                                    <label>{item.main.sea_level}m</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <lable>Feels Like</lable>
                                    <label>{item.main.feels_like}°C </label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>);
}

export default Forecast;
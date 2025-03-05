import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

// -----------------------
// Tłumaczenia
// -----------------------

const translations = {
  pl: {
    title: "Wirtualny Alkomat",
    popularAlcohols: "Najpopularniejsze alkohole",
    alcoholInputForm: "Formularz dodawania alkoholu",
    gender: "Płeć",
    height: "Wzrost (cm)",
    weight: "Waga (kg)",
    age: "Wiek",
    bodyType: "Typ sylwetki",
    foodIntake: "Posiłek",
    metabolism: "Tempo metabolizmu",
    alcoholType: "Rodzaj alkoholu",
    amount: "Ilość (ml)",
    percentage: "% Alkoholu",
    drinkingTime: "Godzina picia",
    add: "Dodaj",
    alcoholList: "Lista spożytych alkoholi",
    actions: "Akcje",
    remove: "Usuń",
    checkBAC: "Sprawdź BAC",
    calculateBACAndChart: "Oblicz BAC i wykres",
    estimatedBAC: "Szacunkowe stężenie alkoholu (BAC)",
    estimatedTimeline: "Szacunkowy wykres trzeźwienia",
    totalSobrietyTime: "Całkowity czas trzeźwienia",
    selectEvaluationTime: "Sprawdź BAC dla wybranej godziny",
    language: "Język",
    time: "Godzina"
  },
  en: {
    title: "Virtual Breathalyzer",
    popularAlcohols: "Most Popular Alcohols",
    alcoholInputForm: "Alcohol Input Form",
    gender: "Gender",
    height: "Height (cm)",
    weight: "Weight (kg)",
    age: "Age",
    bodyType: "Body Type",
    foodIntake: "Meal",
    metabolism: "Metabolism Speed",
    alcoholType: "Alcohol Type",
    amount: "Amount (ml)",
    percentage: "Alcohol %",
    drinkingTime: "Drinking Time",
    add: "Add",
    alcoholList: "Consumed Alcohols",
    actions: "Actions",
    remove: "Remove",
    checkBAC: "Check BAC",
    calculateBACAndChart: "Calculate BAC and Chart",
    estimatedBAC: "Estimated BAC",
    estimatedTimeline: "Estimated Sobriety Timeline",
    totalSobrietyTime: "Total Sobriety Time",
    selectEvaluationTime: "Check BAC for selected time",
    language: "Language",
    time: "Time"
  },
  de: {
    title: "Virtueller Alkoholtester",
    popularAlcohols: "Beliebteste Alkohole",
    alcoholInputForm: "Alkoholeingabeformular",
    gender: "Geschlecht",
    height: "Größe (cm)",
    weight: "Gewicht (kg)",
    age: "Alter",
    bodyType: "Körpertyp",
    foodIntake: "Mahlzeit",
    metabolism: "Stoffwechselgeschwindigkeit",
    alcoholType: "Alkoholsorte",
    amount: "Menge (ml)",
    percentage: "Alkohol %",
    drinkingTime: "Trinkzeit",
    add: "Hinzufügen",
    alcoholList: "Konsumierte Alkohole",
    actions: "Aktionen",
    remove: "Entfernen",
    checkBAC: "BAC prüfen",
    calculateBACAndChart: "BAC und Diagramm berechnen",
    estimatedBAC: "Geschätzter BAC",
    estimatedTimeline: "Geschätzter Nüchternheitsverlauf",
    totalSobrietyTime: "Gesamte Nüchternheitsdauer",
    selectEvaluationTime: "BAC für ausgewählte Zeit prüfen",
    language: "Sprache",
    time: "Zeit"
  },
  es: {
    title: "Alcolómetro Virtual",
    popularAlcohols: "Alcoholes Más Populares",
    alcoholInputForm: "Formulario de Ingreso de Alcohol",
    gender: "Género",
    height: "Altura (cm)",
    weight: "Peso (kg)",
    age: "Edad",
    bodyType: "Tipo de Cuerpo",
    foodIntake: "Comida",
    metabolism: "Velocidad del Metabolismo",
    alcoholType: "Tipo de Alcohol",
    amount: "Cantidad (ml)",
    percentage: "% de Alcohol",
    drinkingTime: "Hora de Consumo",
    add: "Agregar",
    alcoholList: "Alcoholes Consumidos",
    actions: "Acciones",
    remove: "Eliminar",
    checkBAC: "Comprobar BAC",
    calculateBACAndChart: "Calcular BAC y Gráfico",
    estimatedBAC: "BAC Estimado",
    estimatedTimeline: "Cronograma de Sobriedad Estimado",
    totalSobrietyTime: "Tiempo Total de Sobriedad",
    selectEvaluationTime: "Comprobar BAC para la hora seleccionada",
    language: "Idioma",
    time: "Hora"
  },
  cs: {
    title: "Virtuální alkomat",
    popularAlcohols: "Nejpopulárnější alkoholy",
    alcoholInputForm: "Formulář pro zadání alkoholu",
    gender: "Pohlaví",
    height: "Výška (cm)",
    weight: "Hmotnost (kg)",
    age: "Věk",
    bodyType: "Typ postavy",
    foodIntake: "Jídlo",
    metabolism: "Rychlost metabolismu",
    alcoholType: "Druh alkoholu",
    amount: "Množství (ml)",
    percentage: "Obsah alkoholu (%)",
    drinkingTime: "Čas pití",
    add: "Přidat",
    alcoholList: "Vypité alkoholické nápoje",
    actions: "Akce",
    remove: "Odstranit",
    checkBAC: "Zkontrolujte BAC",
    calculateBACAndChart: "Vypočítat BAC a graf",
    estimatedBAC: "Odhadovaný BAC",
    estimatedTimeline: "Odhadovaný průběh střízlivosti",
    totalSobrietyTime: "Celková doba střízlivosti",
    selectEvaluationTime: "Zkontrolujte BAC pro vybraný čas",
    language: "Jazyk",
    time: "Čas"
  }
};

// -----------------------
// Interfejsy i algorytm
// -----------------------

interface AlcoholEntry {
  type: string;
  amount: number;
  percentage: number;
  drinkingTime: Date;
}

interface FormData {
  gender: "male" | "female";
  height: number;
  weight: number;
  age: number;
  bodyType: "slim" | "average" | "stocky";
  foodIntake: "none" | "normal" | "heavy";
  metabolism: "slow" | "normal" | "fast";
  alcoholEntries: AlcoholEntry[];
}

const ABSORPTION_TIME = 1; // godzina
const ELIMINATION_DELAY = 0.5; // godziny
const BASE_ELIMINATION_RATE = {
  slow: 0.09,
  normal: 0.12,
  fast: 0.15,
};

function getDistributionRatio(
  gender: "male" | "female",
  bodyType: "slim" | "average" | "stocky",
  height: number,
  weight: number
): number {
  const bmi = weight / ((height / 100) ** 2);
  let base: number;
  if (gender === "male") {
    if (bodyType === "slim") base = 0.65;
    else if (bodyType === "average") base = 0.7;
    else base = 0.75;
  } else {
    if (bodyType === "slim") base = 0.55;
    else if (bodyType === "average") base = 0.6;
    else base = 0.65;
  }
  if (bmi < 18.5) base *= 0.95;
  else if (bmi > 25) base *= 1.05;
  return base;
}

function getEliminationRate(
  metabolism: "slow" | "normal" | "fast",
  age: number
): number {
  let baseRate = BASE_ELIMINATION_RATE[metabolism];
  const ageAdjustment = age > 30 ? ((age - 30) / 10) * 0.01 : 0;
  return Math.max(baseRate - ageAdjustment, 0.08);
}

/**
 * Nowy algorytm obliczania BAC – najpierw sumujemy skumulowaną ilość alkoholu
 * (z uwzględnieniem liniowej absorpcji dla drinków, które jeszcze się nie zakończyły),
 * a następnie od tej sumy odejmujemy eliminację, która jest liczona od momentu pierwszego drinka.
 */
function calculateBACAtTime(form: FormData, evaluationTime: Date): number {
  if (form.alcoholEntries.length === 0) return 0;
  const ratio = getDistributionRatio(
    form.gender,
    form.bodyType,
    form.height,
    form.weight
  );
  let totalAbsorbed = 0;
  for (const entry of form.alcoholEntries) {
    const pureAlcohol = entry.amount * (entry.percentage / 100) * 0.8;
    const elapsedHours = (evaluationTime.getTime() - entry.drinkingTime.getTime()) / 3600000;
    const fraction = elapsedHours <= 0 ? 0 : Math.min(1, elapsedHours / ABSORPTION_TIME);
    totalAbsorbed += pureAlcohol * fraction;
  }
  // Obliczamy BAC przed eliminacją
  let bac = totalAbsorbed / (form.weight * ratio);
  // Elminacja: liczona od czasu pierwszego drinka
  const firstDrinkTime = new Date(
    Math.min(...form.alcoholEntries.map(e => e.drinkingTime.getTime()))
  );
  const totalElapsed = (evaluationTime.getTime() - firstDrinkTime.getTime()) / 3600000;
  const eliminationRate = getEliminationRate(form.metabolism, form.age);
  const elimination = eliminationRate * totalElapsed;
  bac -= elimination;
  let foodModifier = 1;
  if (form.foodIntake === "normal") foodModifier = 0.9;
  else if (form.foodIntake === "heavy") foodModifier = 0.8;
  bac *= foodModifier;
  return Math.max(bac, 0);
}

interface SobrietyPoint {
  time: Date;
  bac: number;
}

/**
 * Generuje serię punktów (czas, BAC) w odstępach co 30 minut od momentu pierwszego drinka,
 * aż do momentu, gdy BAC spadnie do 0 (lub symulujemy do 12h).
 */
function calculateSobrietyTimeline(form: FormData): SobrietyPoint[] {
  if (form.alcoholEntries.length === 0) return [];
  const startTime = new Date(
    Math.min(...form.alcoholEntries.map(e => e.drinkingTime.getTime()))
  );
  const timeline: SobrietyPoint[] = [];
  const interval = 15 * 60 * 1000;
  let t = startTime.getTime();
  const endSim = startTime.getTime() + 24 * 3600000;
  while (t <= endSim) {
    const timePoint = new Date(t);
    const bac = calculateBACAtTime(form, timePoint);
    timeline.push({ time: timePoint, bac });
    if (startTime.getTime() + (ELIMINATION_DELAY * 3600000) + interval < t && bac <= 0) break;
    t += interval;
  }
  return timeline;
}

// -----------------------
// Komponent z PrimeReact
// -----------------------

const AlcoholCalculatorForm: React.FC = () => {
  const [language, setLanguage] = useState("pl");
  const languageOptions = [
    { label: "Polski", value: "pl" },
    { label: "English", value: "en" },
    { label: "Deutsch", value: "de" },
    { label: "Español", value: "es" },
    { label: "Čeština", value: "cs" },
  ];
  
  const t = language === "pl" ?translations.pl :translations.en;
 // const t = translations[language];
  
  const [formData, setFormData] = useState<FormData>({
    gender: "male",
    height: 172,
    weight: 82,
    age: 33,
    bodyType: "average",
    foodIntake: "normal",
    metabolism: "normal",
    alcoholEntries: [],
  });
  
  const [currentEntry, setCurrentEntry] = useState<AlcoholEntry>({
    type: "",
    amount: 500,
    percentage: 5,
    drinkingTime: new Date(),
  });
  
  const [timeline, setTimeline] = useState<SobrietyPoint[]>([]);
  const [currentBAC, setCurrentBAC] = useState<number | null>(null);
  const [totalSobrietyDuration, setTotalSobrietyDuration] = useState<string>("");
  const [evaluationTime, setEvaluationTime] = useState<Date>(new Date());
  
  const [popularAlcohols, setPopularAlcohols] = useState<AlcoholEntry[]>([
    { type: "Piwo", amount: 500, percentage: 5, drinkingTime: new Date() },
    { type: "Cider", amount: 500, percentage: 5, drinkingTime: new Date() },
    { type: "Wino", amount: 150, percentage: 12, drinkingTime: new Date() },
    { type: "Szampan", amount: 150, percentage: 12, drinkingTime: new Date() },
    { type: "Wódka", amount: 40, percentage: 40, drinkingTime: new Date() },
    { type: "Whisky", amount: 40, percentage: 40, drinkingTime: new Date() },
    { type: "Rum", amount: 40, percentage: 40, drinkingTime: new Date() },
    { type: "Tequila", amount: 40, percentage: 40, drinkingTime: new Date() },
    { type: "Gin", amount: 40, percentage: 40, drinkingTime: new Date() },
    { type: "Likier", amount: 50, percentage: 20, drinkingTime: new Date() },
  ]);
  
  const genderOptions = [
    { label: language === "pl" ? "Mężczyzna" : "Male", value: "male" },
    { label: language === "pl" ? "Kobieta" : "Female", value: "female" },
  ];
  const bodyTypeOptions = [
    { label: language === "pl" ? "Drobna" : "Slim", value: "slim" },
    { label: language === "pl" ? "Normalna" : "Average", value: "average" },
    { label: language === "pl" ? "Krępa" : "Stocky", value: "stocky" },
  ];
  const foodIntakeOptions = [
    { label: language === "pl" ? "Nic" : "None", value: "none" },
    { label: language === "pl" ? "Normalnie" : "Normal", value: "normal" },
    { label: language === "pl" ? "Dużo" : "Heavy", value: "heavy" },
  ];
  const metabolismOptions = [
    { label: language === "pl" ? "Wolno" : "Slow", value: "slow" },
    { label: language === "pl" ? "Normalnie" : "Normal", value: "normal" },
    { label: language === "pl" ? "Szybko" : "Fast", value: "fast" },
  ];
  const alcoholOptions = [
    { label: "Piwo", value: "Piwo" },
    { label: "Wino", value: "Wino" },
    { label: "Mocny alkohol", value: "Mocny alkohol" },
    { label: "Inne", value: "Inne" },
  ];
  
  const handleLanguageChange = (e: any) => {
    setLanguage(e.value);
  };
  
  const handleFormChange = (e: any, field: keyof FormData) => {
    setFormData({ ...formData, [field]: e.value });
  };
  
  const handleEntryChange = (e: any, field: keyof AlcoholEntry) => {
    if (field === "type") {
      const selectedType = e.value as "Piwo" | "Wino" | "Mocny alkohol" | "Inne";
      const defaults = {
        "Piwo": { amount: 500, percentage: 5 },
        "Wino": { amount: 150, percentage: 12 },
        "Mocny alkohol": { amount: 40, percentage: 40 },
        "Inne": { amount: 0, percentage: 0 },
      }[selectedType];
      setCurrentEntry({
        ...currentEntry,
        type: selectedType,
        amount: defaults.amount,
        percentage: defaults.percentage,
      });
    } else {
      setCurrentEntry({ ...currentEntry, [field]: e.value });
    }
  };
  
  const addAlcoholEntry = () => {
    setFormData((prev) => ({
      ...prev,
      alcoholEntries: [
        ...prev.alcoholEntries,
        { ...currentEntry, drinkingTime: new Date(currentEntry.drinkingTime) }
      ],
    }));
    setCurrentEntry({
      type: "",
      amount: 500,
      percentage: 5,
      drinkingTime: new Date(),
    });
  };
  
  const handleRemoveEntry = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      alcoholEntries: prev.alcoholEntries.filter((_, i) => i !== index),
    }));
  };
  
  const addPopularEntry = (entry: AlcoholEntry) => {
    setFormData((prev) => ({
      ...prev,
      alcoholEntries: [...prev.alcoholEntries, { ...entry, drinkingTime: new Date(entry.drinkingTime) }],
    }));
  };
  
  const calculateResults = () => {
    const bac = calculateBACAtTime(formData, evaluationTime);
    setCurrentBAC(bac);
    const timelineResult = calculateSobrietyTimeline(formData);
    setTimeline(timelineResult);
    if (timelineResult.length > 0) {
      const startTime = timelineResult[0].time;
      const soberTime = timelineResult[timelineResult.length - 1].time;
      const durationMs = soberTime.getTime() - startTime.getTime();
      const hours = Math.floor(durationMs / 3600000);
      const minutes = Math.round((durationMs % 3600000) / 60000);
      setTotalSobrietyDuration(
        `${hours} h ${minutes} m (od ${startTime.toLocaleTimeString()} do ${soberTime.toLocaleTimeString()})`
      );
    }
  };
  
  const rowClassName = (data: SobrietyPoint) => {
    const bacRounded = parseFloat(data.bac.toFixed(2));
    if (bacRounded === 0) return "green-row";
    else if (bacRounded > 0 && bacRounded < 0.2) return "yellow-row";
    else if (bacRounded >= 0.2) return "red-row";
    return "";
  };
  
  return (
    <div className="p-4">
      {/* Wybór języka */}
      <div className="p-mb-3">
        <label>{t.language}:</label>
        <Dropdown
          value={language}
          options={languageOptions}
          onChange={handleLanguageChange}
          placeholder={t.language}
        />
      </div>
      
      <h2>{t.title}</h2>
      
      {/* Lista najpopularniejszych alkoholi */}
      <div className="p-mb-3">
        <h3>{t.popularAlcohols}</h3>
        <table className="p-datatable p-component" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>{t.alcoholType}</th>
              <th>{t.amount}</th>
              <th>{t.percentage}</th>
              <th>{t.drinkingTime}</th>
              <th>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {popularAlcohols.map((entry, index) => (
              <tr key={index}>
                <td>{entry.type}</td>
                <td>
                  <InputNumber
                    value={entry.amount}
                    onValueChange={(e) => {
                      const newPop = [...popularAlcohols];
                      newPop[index].amount = e.value ?? 0;
                      setPopularAlcohols(newPop);
                    }}
                    showButtons
                  />
                </td>
                <td>
                  <InputNumber
                    value={entry.percentage}
                    onValueChange={(e) => {
                      const newPop = [...popularAlcohols];
                      newPop[index].percentage = e.value ?? 0;
                      setPopularAlcohols(newPop);
                    }}
                    showButtons
                  />
                </td>
                <td>
                  <Calendar
                    value={entry.drinkingTime}
                    onChange={(e) => {
                      const newPop = [...popularAlcohols];
                      newPop[index].drinkingTime = e.value ?? new Date();
                      setPopularAlcohols(newPop);
                    }}
                    showTime
                    hourFormat="24"
                  />
                </td>
                <td>
                  <Button label={t.add} onClick={() => addPopularEntry(popularAlcohols[index])} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Formularz danych użytkownika */}
      <div className="p-fluid grid">
        <div className="field col-4">
          <label>{t.gender}</label>
          <Dropdown
            value={formData.gender}
            options={genderOptions}
            onChange={(e) => handleFormChange(e, "gender")}
            placeholder={t.gender}
          />
        </div>
        <div className="field col-4">
          <label>{t.height}</label>
          <InputNumber
            value={formData.height}
            onValueChange={(e) => handleFormChange(e, "height")}
            showButtons
            min={140}
            max={220}
          />
        </div>
        <div className="field col-4">
          <label>{t.weight}</label>
          <InputNumber
            value={formData.weight}
            onValueChange={(e) => handleFormChange(e, "weight")}
            showButtons
            min={40}
            max={150}
          />
        </div>
        <div className="field col-4">
          <label>{t.age}</label>
          <InputNumber
            value={formData.age}
            onValueChange={(e) => handleFormChange(e, "age")}
            showButtons
            min={18}
            max={100}
          />
        </div>
        <div className="field col-4">
          <label>{t.bodyType}</label>
          <Dropdown
            value={formData.bodyType}
            options={bodyTypeOptions}
            onChange={(e) => handleFormChange(e, "bodyType")}
            placeholder={t.bodyType}
          />
        </div>
        <div className="field col-4">
          <label>{t.foodIntake}</label>
          <Dropdown
            value={formData.foodIntake}
            options={foodIntakeOptions}
            onChange={(e) => handleFormChange(e, "foodIntake")}
            placeholder={t.foodIntake}
          />
        </div>
        <div className="field col-4">
          <label>{t.metabolism}</label>
          <Dropdown
            value={formData.metabolism}
            options={metabolismOptions}
            onChange={(e) => handleFormChange(e, "metabolism")}
            placeholder={t.metabolism}
          />
        </div>
      </div>
      
      {/* Formularz dodawania alkoholu */}
      <h3>{t.alcoholInputForm}</h3>
      <div className="p-fluid grid">
        <div className="field col-3">
          <label>{t.alcoholType}</label>
          <Dropdown
            value={currentEntry.type}
            options={alcoholOptions}
            onChange={(e) => handleEntryChange(e, "type")}
            placeholder={t.alcoholType}
          />
        </div>
        <div className="field col-3">
          <label>{t.amount}</label>
          <InputNumber
            value={currentEntry.amount}
            onValueChange={(e) => handleEntryChange(e, "amount")}
            showButtons
          />
        </div>
        <div className="field col-3">
          <label>{t.percentage}</label>
          <InputNumber
            value={currentEntry.percentage}
            onValueChange={(e) => handleEntryChange(e, "percentage")}
            showButtons
          />
        </div>
        <div className="field col-3">
          <label>{t.drinkingTime}</label>
          <Calendar
            value={currentEntry.drinkingTime}
            onChange={(e) => handleEntryChange(e, "drinkingTime")}
            showTime
            hourFormat="24"
          />
        </div>
        <div className="col-12">
          <Button label={t.add} onClick={addAlcoholEntry} />
        </div>
      </div>
      
      {/* Lista spożytych alkoholi */}
      <h3>{t.alcoholList}</h3>
      <DataTable value={formData.alcoholEntries} responsiveLayout="scroll">
        <Column field="type" header={t.alcoholType} />
        <Column field="amount" header={t.amount} />
        <Column field="percentage" header={t.percentage} />
        <Column
          field="drinkingTime"
          header={t.drinkingTime}
          body={(rowData) => rowData.drinkingTime.toLocaleString()}
        />
        <Column
          header={t.actions}
          body={(rowData, options) => (
            <Button
              label={t.remove}
              className="p-button-danger p-button-sm"
              onClick={() => handleRemoveEntry(options.rowIndex)}
            />
          )}
        />
      </DataTable>
      
      {/* Pole do ustawienia godziny do sprawdzenia BAC */}
      <h3>{t.selectEvaluationTime}</h3>
      <div className="p-fluid grid">
        <div className="field col-4">
          <Calendar
            value={evaluationTime}
            onChange={(e) => setEvaluationTime(e.value ?? new Date())}
            showTime
            hourFormat="24"
            placeholder={t.selectEvaluationTime}
          />
        </div>
        <div className="col-4">
          <Button label={t.checkBAC} onClick={calculateResults} />
        </div>
      </div>
      
      {currentBAC !== null && (
        <div className="p-mt-3">
          <h3>
            {t.estimatedBAC} {evaluationTime.toLocaleTimeString()}: {currentBAC.toFixed(2)}‰
          </h3>
        </div>
      )}
      
      {timeline.length > 0 && (
        <div className="p-mt-3">
          <h3>{t.estimatedTimeline}</h3>
          <p>
            <strong>{t.totalSobrietyTime}:</strong> {totalSobrietyDuration}
          </p>
          <DataTable value={timeline} rowClassName={rowClassName}>
            <Column
              field="time"
              header={t.time}
              body={(rowData) => rowData.time.toLocaleTimeString()}
            />
            <Column field="bac" header={t.percentage} />
          </DataTable>
          <Chart
            type="line"
            data={{
              labels: timeline.map((pt) => pt.time.toLocaleTimeString()),
              datasets: [
                {
                  label: "BAC",
                  data: timeline.map((pt) => pt.bac),
                  borderColor: "red",
                  fill: false,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: t.percentage },
                },
                x: {
                  title: { display: true, text: t.time },
                },
              },
            }}
          />
        </div>
      )}
      
      <style>{`
        .red-row {
          background-color: rgba(255, 0, 0, 0.3) !important;
        }
        .yellow-row {
          background-color: rgba(81, 255, 0, 0.61) !important;
        }
        .green-row {
          background-color: rgba(0, 255, 0, 0.3) !important;
        }
      `}</style>
    </div>
  );
};

export default AlcoholCalculatorForm;

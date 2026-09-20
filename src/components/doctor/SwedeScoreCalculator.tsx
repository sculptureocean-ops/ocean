import type { SwedeScore } from '../../types/clinical';
import { Calculator, AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';

interface SwedeScoreCalculatorProps {
  score: SwedeScore;
  onChange: (newScore: SwedeScore) => void;
}

export const SwedeScoreCalculator: React.FC<SwedeScoreCalculatorProps> = ({
  score,
  onChange
}) => {
  const updateDimension = (field: keyof Omit<SwedeScore, 'totalScore' | 'riskInterpretation'>, val: number) => {
    const updated = { ...score, [field]: val };
    const total = 
      updated.acetowhitening +
      updated.marginsSurface +
      updated.vessels +
      updated.lesionSize +
      updated.iodineUptake;

    let interp: SwedeScore['riskInterpretation'] = 'Low probability of HSIL (0-4)';
    if (total >= 8) {
      interp = 'High probability of HSIL / CIN 2/3 (8-10)';
    } else if (total >= 5) {
      interp = 'Moderate risk (5-7)';
    }

    onChange({
      ...updated,
      totalScore: total,
      riskInterpretation: interp
    });
  };

  const rows = [
    {
      key: 'acetowhitening' as const,
      label: 'Acetowhitening',
      options: [
        { points: 0, text: 'No acetowhitening or faint translucent whitening' },
        { points: 1, text: 'Distinct white lesion' },
        { points: 2, text: 'Dense, opaque, chalky white lesion' }
      ]
    },
    {
      key: 'marginsSurface' as const,
      label: 'Margins / Surface',
      options: [
        { points: 0, text: 'Diffuse, indistinct margins' },
        { points: 1, text: 'Sharp margins' },
        { points: 2, text: 'Sharp margins with raised edges or internal borders ("lesion within lesion")' }
      ]
    },
    {
      key: 'vessels' as const,
      label: 'Vessels',
      options: [
        { points: 0, text: 'Normal vessels' },
        { points: 1, text: 'Fine punctation or fine mosaic' },
        { points: 2, text: 'Coarse punctation, coarse mosaic, or atypical vessels' }
      ]
    },
    {
      key: 'lesionSize' as const,
      label: 'Lesion Size',
      options: [
        { points: 0, text: '<5 mm or involving <1 cervical quadrant' },
        { points: 1, text: '5–15 mm or involving 1–2 quadrants' },
        { points: 2, text: '>15 mm or involving >2 quadrants / endocervical canal' }
      ]
    },
    {
      key: 'iodineUptake' as const,
      label: 'Iodine Uptake (Schiller)',
      options: [
        { points: 0, text: 'Uniform brown staining' },
        { points: 1, text: 'Partial iodine uptake' },
        { points: 2, text: 'Complete yellow / no iodine uptake' }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden text-stone-900">
      
      {/* Header with Live Tally */}
      <div className="px-5 py-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-600/10 text-teal-700 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">
              Swede Score Colposcopy Calculator
            </h4>
            <p className="text-[11px] text-stone-500">
              Scoring 0–10 based on standard international colposcopic criteria
            </p>
          </div>
        </div>

        {/* Dynamic Score Badge */}
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white shadow-xs flex items-center space-x-2">
            <span className="text-xs text-stone-500 font-medium">Total Score:</span>
            <span className={`text-base font-bold font-mono ${
              score.totalScore >= 8 ? 'text-rose-700' : score.totalScore >= 5 ? 'text-amber-700' : 'text-teal-700'
            }`}>
              {score.totalScore} / 10
            </span>
          </div>

          <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 ${
            score.totalScore >= 8 
              ? 'bg-rose-100 text-rose-800 border border-rose-200' 
              : score.totalScore >= 5 
              ? 'bg-amber-100 text-amber-900 border border-amber-200' 
              : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
          }`}>
            {score.totalScore >= 8 ? (
              <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
            ) : score.totalScore >= 5 ? (
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            ) : (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
            )}
            <span>
              {score.totalScore >= 8 ? 'High Risk (8-10)' : score.totalScore >= 5 ? 'Moderate Risk (5-7)' : 'Low Risk (0-4)'}
            </span>
          </div>
        </div>
      </div>

      {/* Feature Selector Table */}
      <div className="p-4 space-y-4">
        {rows.map((row) => (
          <div key={row.key} className="space-y-1.5 border-b border-stone-100 pb-3 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-stone-800">
                {row.label}
              </span>
              <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-bold">
                {score[row.key]} pts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {row.options.map((opt) => {
                const isSelected = score[row.key] === opt.points;
                return (
                  <button
                    key={opt.points}
                    type="button"
                    onClick={() => updateDimension(row.key, opt.points)}
                    className={`p-2.5 text-left rounded-xl border text-xs transition-all cursor-pointer flex items-start space-x-2 ${
                      isSelected
                        ? 'border-teal-700 bg-teal-50/70 text-teal-950 font-medium shadow-xs ring-1 ring-teal-600/30'
                        : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${
                      isSelected ? 'bg-teal-700 text-white' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {opt.points}
                    </span>
                    <span className="leading-snug text-[11px]">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation Interpretation Footer */}
      <div className={`p-4 border-t text-xs leading-relaxed ${
        score.totalScore >= 8 
          ? 'bg-rose-50 border-rose-200 text-rose-950' 
          : score.totalScore >= 5 
          ? 'bg-amber-50 border-amber-200 text-amber-950' 
          : 'bg-emerald-50 border-emerald-200 text-emerald-950'
      }`}>
        <div className="flex items-start space-x-2">
          {score.totalScore >= 8 ? (
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          ) : score.totalScore >= 5 ? (
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-bold">Clinical Interpretation: </span>
            {score.totalScore >= 8 ? (
              <span>
                <strong>Score 8–10 (High Risk):</strong> High probability of HSIL (CIN 2/3). Cervical punch biopsy is essential. Excisional treatment (LEEP/LLETZ or Cold Knife Conization) may be considered after histological confirmation.
              </span>
            ) : score.totalScore >= 5 ? (
              <span>
                <strong>Score 5–7 (Moderate Risk):</strong> Moderate risk of cervical intraepithelial neoplasia. Colposcopy-directed biopsy is strongly recommended.
              </span>
            ) : (
              <span>
                <strong>Score 0–4 (Low Risk):</strong> Low probability of high-grade lesion (HSIL). Routine follow-up, repeat screening, or surveillance as per national guideline.
              </span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

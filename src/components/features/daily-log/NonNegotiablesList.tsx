import { NON_NEGOTIABLES } from '../../../data/dailyLogData';

interface NonNegotiablesListProps {
    checkedItems: Record<string, boolean>;
    onChange: (item: string) => void;
}

const NonNegotiablesList = ({ checkedItems, onChange }: NonNegotiablesListProps) => {
    return (
        <div className="non-negotiables-section mb-8">
            <label className="section-label accent-color">
                ✅ Daily Non-Negotiables Checklist
            </label>
            <div className="checklist-grid">
                {NON_NEGOTIABLES.map((item) => (
                    <label key={item} className={`checklist-item ${checkedItems[item] ? 'checked' : ''}`}>
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                checked={!!checkedItems[item]}
                                onChange={() => onChange(item)}
                            />
                            <div className="custom-checkbox-display"></div>
                        </div>
                        <span className="checklist-text">
                            {item}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default NonNegotiablesList;

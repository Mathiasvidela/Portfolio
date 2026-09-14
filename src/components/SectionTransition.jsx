export default function SectionTransition({ reverse = false }) {
    return (
        <div className="section-transition" data-section-transition data-direction={reverse ? 1 : -1} aria-hidden="true">
            <div className="section-transition__panel">
                <span className="section-transition__code">{'</>'}</span>
                <span className="section-transition__line" />
            </div>
        </div>
    );
}

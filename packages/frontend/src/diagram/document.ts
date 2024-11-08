import { type Accessor, createMemo } from "solid-js";

import type { ExternRef, LiveDoc } from "../api";
import type { LiveModelDocument } from "../model";
import { type Notebook, newNotebook } from "../notebook";
import type { DiagramJudgment } from "./types";

/** A document defining a diagram in a model. */
export type DiagramDocument = {
    type: "diagram";

    /** User-defined name of diagram. */
    name: string;

    /** Reference to the model that the diagram is in. */
    modelRef: ExternRef & { taxon: "model" };

    /** Content of the diagram. */
    notebook: Notebook<DiagramJudgment>;
};

/** Create an empty diagram of a model. */
export const newDiagramDocument = (modelRefId: string): DiagramDocument => ({
    name: "",
    type: "diagram",
    modelRef: {
        tag: "extern-ref",
        refId: modelRefId,
        taxon: "model",
    },
    notebook: newNotebook(),
});

/** A diagram document "live" for editing.
 */
export type LiveDiagramDocument = {
    /** The ref for which this is a live document. */
    refId: string;

    /** Live document containing the diagram data. */
    liveDoc: LiveDoc<DiagramDocument>;

    /** Live model that the diagram is in. */
    liveModel: LiveModelDocument;

    /** A memo of the formal content of the model. */
    formalJudgments: Accessor<Array<DiagramJudgment>>;
};

export function enlivenDiagramDocument(
    refId: string,
    liveDoc: LiveDoc<DiagramDocument>,
    liveModel: LiveModelDocument,
): LiveDiagramDocument {
    const { doc } = liveDoc;

    const formalJudgments = createMemo<Array<DiagramJudgment>>(() => {
        return doc.notebook.cells
            .filter((cell) => cell.tag === "formal")
            .map((cell) => cell.content);
    }, []);

    return { refId, liveDoc, liveModel, formalJudgments };
}

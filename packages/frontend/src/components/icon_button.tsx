import { Tooltip } from "@kobalte/core/tooltip";
import { type JSX, Show, splitProps } from "solid-js";

import "./icon_button.css";

/** Styled, unobstrusive button intended to include an icon.
 */
export function IconButton(
    allProps: {
        children: JSX.Element;
        tooltip?: string;
    } & JSX.ButtonHTMLAttributes<HTMLButtonElement>,
) {
    const [props, buttonProps] = splitProps(allProps, ["children", "tooltip"]);

    return (
        <Show
            when={props.tooltip}
            fallback={
                <button class="icon-button" {...buttonProps}>
                    {props.children}
                </button>
            }
        >
            <Tooltip openDelay={1000}>
                <Tooltip.Trigger class="icon-button" {...buttonProps}>
                    {props.children}
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content class="tooltip-content">{props.tooltip}</Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip>
        </Show>
    );
}

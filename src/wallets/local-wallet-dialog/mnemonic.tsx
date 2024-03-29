import React, { ReactNode } from "react";
import { DepositDialogWithButtons } from "@libs/neumorphism-ui/components/DialogWithButtons";
import { Box, Button, Divider, Grid, styled } from "@mui/material";
import { TextInput } from "@libs/neumorphism-ui/components/TextInput";
import { DialogProps } from "@libs/use-dialog";
import { CircularProgressWithLabel } from "components/primitives/circular-progress";
import { copyWords } from "./helpers";


export interface MnemonicFormParams<P, T> {
    words: string[],
    title: ReactNode,
    formDialog: (_: DialogProps<P, T | null>) => React.JSX.Element,
    formDialogProps: P,
    className?: string | undefined
}

export function AccountCreationTitle({ progress }: { progress: number }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            Account Creation <CircularProgressWithLabel value={progress} />
        </Box>
    )
}

export function MnemonicDialogBase<P, T>({ words, formDialog, formDialogProps, closeDialog, title, className }: DialogProps<MnemonicFormParams<P, T>, T | null>) {

    return (
        <DepositDialogWithButtons className={className} title={title} spacing={3} closeDialog={() => {
            closeDialog(null)
        }}>
            <Grid item xs={12}>
                <strong>
                    Those {words.length} words (also named <i>mnemonic</i>)
                    represent your account.
                </strong>
                <br />
                <strong>
                    Please keep those words somewhere, you will use them to
                    recover your account
                </strong>
            </Grid>
            <Grid item sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "30px" }}>
                <Grid container spacing={2} sx={{ padding: 1 }}>
                    {words.map(function (word, i) {
                        return (
                            <Grid item xs={4} sm={3} key={`${word} - ${i}`}>
                                <TextInput
                                    label={`Word ${i + 1}`}
                                    defaultValue={word}
                                    size="small"
                                    InputProps={{
                                        readOnly: true, // This makes the input read-only
                                        style: {
                                            padding: 0,
                                        },
                                    }}
                                ></TextInput>
                            </Grid>
                        )
                    })}
                </Grid>

                <Button
                    variant="contained"
                    type="button"
                    color="primary"
                    sx={{ maxWidth: "400px" }}
                    onClick={() => copyWords(words)}
                >
                    Copy all words
                </Button>
            </Grid>
            <Divider flexItem sx={{ width: "100%", borderColor: "white" }} />

            <Grid item sx={{ width: "100%", margin: "auto" }}>
                {formDialog({ ...formDialogProps, closeDialog })}
            </Grid>
        </DepositDialogWithButtons >
    );
}


export const MnemonicDialog = styled(MnemonicDialogBase)`

    @media (max-width: 700px) {
        .dialog-content{
            margin-left: 10px !important;
            margin-right: 10px !important;
        }
        .MuiGrid-item{
            padding-left:3px !important;
        }
    }

`
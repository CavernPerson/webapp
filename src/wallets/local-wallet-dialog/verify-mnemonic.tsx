import { Button, FormControl, Grid, styled } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import toast from 'react-hot-toast'

import { DepositDialogWithButtons } from "@libs/neumorphism-ui/components/DialogWithButtons";
import { Divider } from "@mui/material";
import { TextInput } from "@libs/neumorphism-ui/components/TextInput";
import { DialogProps, useDialog } from '@libs/use-dialog'
import { AccountCreationTitle } from './mnemonic'

function getWordName(i: number) {
    return `word-${i}`
}

interface VerifyMnemonicParams {
    className?: string | undefined,
    words: string[]
}

function VerifyMnemonicDialogBase(
    { closeDialog, words, className }: DialogProps<VerifyMnemonicParams, boolean>
) {

    const formik = useFormik({
        initialValues: words.reduce((obj, _current, index) => {
            obj[getWordName(index)] = ''
            return obj
        }, {} as Record<string, string>),
        validationSchema: yup.object(
            words.reduce((obj, current, index) => {
                obj[getWordName(index)] = yup
                    .string()
                    .required('Required')
                    .oneOf([current], 'Wrong')
                return obj
            }, {} as Record<string, yup.StringSchema>)
        ),
        onSubmit: () => {
            closeDialog(true)
        },
        validateOnMount: true,
    })

    useEffect(() => {
        if (formik.isValid && formik.dirty) {
            formik.submitForm()
            toast.success('Mnemonic Verified Successfully')
        }
    }, [formik.dirty, formik.isValid, formik.submitForm, formik])

    function handlePaste(event: React.ClipboardEvent) {
        const words: string[] = event.clipboardData.getData('text').split(' ')
        formik.setValues(
            words.reduce((obj, current, index) => {
                obj[getWordName(index)] = current
                return obj
            }, {} as Record<string, string>)
        )
        event.preventDefault()
    }

    return (

        <form onSubmit={formik.handleSubmit} className="form-element">
            <DepositDialogWithButtons className={className} spacing={3} title={<AccountCreationTitle progress={50} />} closeDialog={() => {
                closeDialog(false)
            }}>
                <Grid item xs={12}>
                    We just want to verify here that your mnemonic is safely stored.
                    <br />
                    After this step, this platform will <strong>NEVER</strong> ask for
                    this mnemonic again !
                </Grid>
                <Divider flexItem sx={{ width: "100%", borderColor: "white" }} />

                <Grid item sx={{ width: "100%", margin: "auto" }}>
                    <FormControl
                        sx={{ width: '100%', padding: '0px', gap: 2, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "8px" }}
                    >
                        <Grid container spacing={3} sx={{ padding: 1 }}>
                            {words.map((_, i) => {
                                return (
                                    <Grid
                                        item
                                        xs={4}
                                        sm={4}
                                        key={`verify-mnemonic-word - ${i}`}
                                    >
                                        <TextInput
                                            label={`Word ${i + 1}`}
                                            size="small"
                                            InputProps={{
                                                style: {
                                                    padding: 0,
                                                },
                                            }}
                                            id={getWordName(i)}
                                            type="text"
                                            name={getWordName(i)}
                                            value={formik.values[getWordName(i)]}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched[getWordName(i)] &&
                                                Boolean(
                                                    formik.errors[getWordName(i)]
                                                )
                                            }
                                            onPaste={handlePaste}
                                            helperText={
                                                (formik.touched[getWordName(i)] as
                                                    | boolean
                                                    | undefined) &&
                                                (formik.errors[getWordName(i)] as
                                                    | string
                                                    | undefined)
                                            }
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Button type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ maxWidth: "400px" }}>Submit</Button>
                    </FormControl>
                </Grid>
            </DepositDialogWithButtons >
        </form>
    )
}

export const VerifyMnemonicDialog = styled(VerifyMnemonicDialogBase)`

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
export function useVerifyMnemonicDialog() {
    return useDialog<VerifyMnemonicParams, boolean>(VerifyMnemonicDialog)
}
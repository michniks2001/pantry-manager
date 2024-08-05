"use client"

import { Stack, Checkbox, Typography, Button, Dialog, DialogContentText, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material"
import { useState } from "react"

const buttonStyles = {
    bgcolor: "#add8e6",
    color: "white",
    ":hover": {
        bgcolor: "#9cc7d5"
    }
}

const PantryItem = ({item, isSelected, onChange, updateItem}) => {
    const [open, setOpen] = useState(false)
    const [itemName, setItemName] = useState(item.name)
    
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    
    const handleCheckboxChange = (e) => {
        onChange(e.target.value)
    }

    const handleUpdateItem = (e) => {
        e.preventDefault()
        updateItem(item, itemName)
        handleClose()
    }

    const handleItemNameChange = (e) => {
        setItemName(e.target.value)
    }

    return (
        <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center">
                <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
                <Typography variant="h4" textAlign="left">
                    {item.name}
                </Typography>
            </Stack>
            <Button onClick={handleOpen} sx={buttonStyles} variant="contained">
                Update
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Update Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update your item's name
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Item Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={itemName}
                        onChange={handleItemNameChange}
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdateItem}>Update</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    )
}

export default PantryItem
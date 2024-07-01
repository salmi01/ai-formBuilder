import { Input } from '@/components/ui/input'
import React, { useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from '@/components/ui/checkbox'
import FieldEdit from './fieldEdit'
import { db } from '@/configs'
import { UserResponses } from '@/configs/schema'
import moment from 'moment'
import { toast } from 'sonner'
import { SignInButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'




function FormUi({ jsonForm, selectedTheme, selectedStyle, onFieldUpdate, deleteField, editable, formId = 0, enableSignIn = false }) {


  const [formData, setFormData] = useState()
  let formReference = useRef()
  const { user, isSignedIn } = useUser()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    }
    )
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    }
    )
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    console.log(formData)
    const result = await db.insert(UserResponses).values({
      jsonResponse: formData,
      createdAt: moment().format('DD/MM/yyyy'),
      formRef: formId,
    })
    if (result) {
      formReference.reset()
      toast('Response submitted successfully !')
    } else {
      toast('Error while submitting the form !')
    }
  }

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData?.[fieldName] ? formData?.[fieldName] : []
    if (value) {
      list.push({
        label: itemName,
        value: value,
      })
      setFormData({
        ...formData,
        [fieldName]: list,
      })
    } else {
      const result = list.filter((item) => item.label == itemName)
      setFormData({
        ...formData,
        [fieldName]: result,
      })
    }
    console.log(formData)
  }

  const appliedStyle = {
    [selectedStyle?.key]: selectedStyle?.value
  };

  return (
    <form ref={(e) => formReference = e} onSubmit={handleFormSubmit} className=' p-5 md:w-[600px] rounded-lg' data-theme={selectedTheme} style={appliedStyle}>
      <h2 className='font-bold text-center text-2xl'>
        {jsonForm?.formTitle}

      </h2>
      <h2 className='text-sm text-center'>
        {jsonForm?.formHeading}
      </h2>
      {jsonForm?.formFields?.map((formField, index) => (
        <div key={index} className=''>
          {formField?.fieldType === 'select' ?
            <div className='my-3 w-full'>
              <label className='text-xs '>{formField?.label}</label>
              <Select required={formField?.required} onValueChange={(value) => handleSelectChange(formField?.fieldName, value)}>
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={formField?.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {formField?.options.map((option, index) => (
                    <SelectItem key={index} value={option} > {option} </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            : formField.fieldType === 'radio' ?
              <div className='my-3 w-full'>
                <label className='text-xs '>{formField?.label}</label>
                <RadioGroup required={formField?.required}>
                  {formField.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} onClick={() => handleSelectChange(formField?.fieldName, option?.value)} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              : formField.fieldType === 'checkbox' ?
                <div className='my-3 w-full'>
                  <label className='text-xs '>{formField.label}</label>
                  {formField?.options ? formField?.options?.map((option, index) => (
                    <div key={index} className='flex gap-2 items-center'>
                      <Checkbox id={option?.value} onCheckedChange={(value) => handleCheckboxChange(formField?.label, option?.label, value)} />
                      <label
                        htmlFor={option?.value}
                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option?.label}
                      </label>
                    </div>
                  ))
                    :
                    <div className='flex gap-2 items-center '>
                      <Checkbox id={formField?.label} required={formField?.required} onCheckedChange={(value) => handleCheckboxChange(formField?.label, value)} />
                      <label
                        htmlFor={formField?.label}
                        className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >{formField?.label}</label>
                    </div>
                  }

                </div>

                :
                <div key={index} className='my-3 w-full'>

                  <label className='text-xs '>{formField?.label}</label>
                  <Input className='bg-transparent' type={formField?.fieldType} placeholder={formField?.placeholder} name={formField?.fieldName}
                    required={formField?.required} onChange={(e) => handleInputChange(e)}
                  />
                </div>
          }

          <div className='mt-1 flex justify-end'>
            {editable && <FieldEdit defaultValue={formField} onUpdate={(value) => onFieldUpdate(value, index)} deleteField={() => deleteField(index)} />}
          </div>
        </div>
      ))}
      {
        enableSignIn ? isSignedIn ? <button type='submit' className='btn btn-primary'>Submit</button> :
          <Button> <SignInButton mode='modal'>Sign in before submit </SignInButton></Button> :
          <div className='flex  justify-center'><button type='submit' className=' btn btn-primary '>Submit</button></div>
      }

    </form>
  )
}

export default FormUi
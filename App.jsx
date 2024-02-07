import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { MaskedTextInput } from 'react-native-mask-text'

// Components
const App = () => {
  const schema = yup.object({
    telephone: yup
      .string()
      .min(15, 'Número inválido')
      .required('Informe seu telefone'),
    email: yup.string().email('Email invalido').required('Informe seu email'),
    password: yup
      .string()
      .min(8, 'A senha deve conter 8 ou mais dígitos')
      .max(32, 'A senha ultrapassa o limite de caracteres')
      .required('Informe sua senha'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleSignUp = (data) => console.log(data)

  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Image source={require('./assets/facebook-icon.png')} />
        <Text style={styles.headerTitle}>Cadastre uma conta</Text>
      </View>
      <View style={styles.formContent}>
        {/* Telephone */}
        <Controller
          name="telephone"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <MaskedTextInput
              style={styles.beautifulInput}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              mask="(99) 99999-9999"
              keyboardType="numeric"
              placeholder="(01) 23456-7890"
            />
          )}
        />
        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.beautifulInput}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="email-address"
              placeholder="meu@email.com"
            />
          )}
        />
        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.beautifulInput}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Sua senha"
              secureTextEntry={true}
            />
          )}
        />
        {/* If three is invalid data */}
        <View style={styles.errorsList}>
          {errors.telephone && (
            <Text style={styles.textError}>• {errors.telephone?.message}</Text>
          )}
          {errors.email && (
            <Text style={styles.textError}>• {errors.email?.message}</Text>
          )}
          {errors.password && (
            <Text style={styles.textError}>• {errors.password?.message}</Text>
          )}
        </View>
        {/* Submit */}
        <TouchableOpacity
          style={styles.beautifulButton}
          onPress={handleSubmit(handleSignUp)}
        >
          <Text style={styles.labelButton}>Cadastrar</Text>
        </TouchableOpacity>
        {/* Log-in screen isn't built */}
        <Text style={styles.redirectToLogin}>Já tenho uma conta</Text>
        <StatusBar barStyle={'default'} />
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  app: {
    paddingHorizontal: '10%',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
  formContent: {
    gap: 10,
    flex: 1,
  },
  labelInput: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  beautifulInput: {
    padding: '4%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgb(163 163 163);',
    backgroundColor: 'rgb(228 228 231);',
  },
  labelButton: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  textError: {
    color: 'rgb(239 68 68);',
  },
  beautifulButton: {
    padding: '4%',
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'rgb(37 99 235);',
  },
  redirectToLogin: {
    textAlign: 'center',
    color: 'rgb(163 163 163);',
  },
})

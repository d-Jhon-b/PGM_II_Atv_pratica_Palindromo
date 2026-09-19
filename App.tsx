import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import React, { useState } from 'react';
import definirSeEPalindroma from './src/utils/palindrome';

export default function App() {
  const [palavra, setPalavra] = useState<string>("");  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const verificarPalindromo = async () => {
    setIsSubmitting(true);
    try {
      const resposta = await definirSeEPalindroma(palavra);
      Alert.alert(
        resposta.resultaod ? "É Palíndroma!" : "Não é Palíndroma", 
        `${resposta.msg}\n\nMatriz gerada:\n[${resposta.lista.join(', ')}]`
      );
      setPalavra("");
    } catch (error) {
      Alert.alert("Erro", `Ocorreu um erro ao processar.\n${error}`);
    } finally {
      setIsSubmitting(false); 
    }
  };

  const isButtonDisabled = palavra.trim() === "" || isSubmitting;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Detector de Palíndromos</Text>
        <Text style={styles.subtitle}>
          Digite uma palavra ou frase para descobrir se ela pode ser lida da mesma forma de trás para frente.
        </Text>

        <TextInput 
          style={[styles.input, isSubmitting && styles.inputDisabled]} 
          placeholder="Ex: A sacada da casa"
          placeholderTextColor="#9ca3af"
          value={palavra}
          onChangeText={setPalavra}
          editable={!isSubmitting}
          autoCapitalize="sentences"
        />

        <TouchableOpacity 
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]} 
          disabled={isButtonDisabled}
          onPress={verificarPalindromo}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Analisando..." : "Verificar Texto"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F3F4F6', 
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937', 
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 28,
    textAlign: 'center',
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 20,
  },
  inputDisabled: {
    opacity: 0.6,
    backgroundColor: '#F3F4F6',
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#A5B4FC',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});